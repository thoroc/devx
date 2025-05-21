#!/bin/bash
set -e

# Define variables
CERTS_DIR="./data/traefik/certs"  # Updated to output certificates in data/certs
DOMAINS=("n8n.home.arpa" "portainer.home.arpa" "traefik.home.arpa" "verdaccio.home.arpa" "watchtower.home.arpa" "whoami.home.arpa")
CA_NAME="DevToolsLocalCA"
CA_KEY="${CERTS_DIR}/ca.key"
CA_CERT="${CERTS_DIR}/ca.crt"

# Create necessary directories
mkdir -p "${CERTS_DIR}"
mkdir -p "${CERTS_DIR}/domains"


LOG_FILE="${CERTS_DIR}/certs_generation.log"
exec > >(tee -a "${LOG_FILE}") 2>&1

echo "🔐 Generating self-signed certificates for local development..."

# Generate Root CA certificate if it doesn't exist
if [ ! -f "${CA_KEY}" ] || [ ! -f "${CA_CERT}" ]; then
  echo "📝 Generating Root CA certificate..."
  
  # Generate CA private key
  openssl genrsa -out "${CA_KEY}" 4096
  
  # Generate CA certificate
  openssl req -x509 -new -nodes -key "${CA_KEY}" -sha256 -days 3650 -out "${CA_CERT}" \
    -subj "/C=US/ST=Local/L=Development/O=DevTools/CN=${CA_NAME}" \
    -addext "basicConstraints=critical,CA:true" \
    -addext "keyUsage=critical,keyCertSign,cRLSign"
  
  echo "✅ Root CA certificate generated."
else
  echo "ℹ️ Root CA certificate already exists. Skipping generation."
fi

# Generate certificates for each domain
for DOMAIN in "${DOMAINS[@]}"; do
  DOMAIN_DIR="${CERTS_DIR}/domains/${DOMAIN}"
  DOMAIN_KEY="${DOMAIN_DIR}/privkey.pem"
  DOMAIN_CSR="${DOMAIN_DIR}/request.csr"
  DOMAIN_CERT="${DOMAIN_DIR}/fullchain.pem"
  DOMAIN_CONFIG="${DOMAIN_DIR}/openssl.cnf"
  
  echo "📝 Generating certificate for ${DOMAIN}..."
  
  # Create domain directory
  mkdir -p "${DOMAIN_DIR}"
  
  # Create OpenSSL config for the domain
  cat > "${DOMAIN_CONFIG}" << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = Local
L = Development
O = DevTools
CN = ${DOMAIN}

[v3_req]
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${DOMAIN}
EOF
  
  # Generate domain private key
  openssl genrsa -out "${DOMAIN_KEY}" 2048
  
  # Generate CSR
  openssl req -new -key "${DOMAIN_KEY}" -out "${DOMAIN_CSR}" -config "${DOMAIN_CONFIG}"
  
  # Sign the certificate with our CA
  openssl x509 -req -in "${DOMAIN_CSR}" -CA "${CA_CERT}" -CAkey "${CA_KEY}" \
    -CAcreateserial -out "${DOMAIN_CERT}" -days 365 -sha256 \
    -extensions v3_req -extfile "${DOMAIN_CONFIG}"
  
  # Set appropriate permissions
  chmod 644 "${DOMAIN_CERT}"
  chmod 600 "${DOMAIN_KEY}"
  
  echo "✅ Certificate for ${DOMAIN} generated successfully."
done

echo "
🎉 All certificates generated successfully!

To trust these certificates on your system:
- For macOS: sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${CA_CERT}
- For Linux: Update your system's CA store with the CA certificate
- For Windows: Install the CA certificate in the Trusted Root Certification Authorities store

For Docker & Traefik configuration:
1. Update your Traefik configuration to use these certificates
2. Ensure your domains are mapped in your hosts file:

   sudo echo \"127.0.0.1 n8n.home.arpa portainer.home.arpa traefik.home.arpa verdaccio.home.arpa watchtower.home.arpa whoami.home.arpa\" >> /etc/hosts

"

echo "🔐 Certificate generation completed!"