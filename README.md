# Tezos to Etherlink FA Bridge Demo

This is a Next.js demo application for the [Tezos to Etherlink FA Bridge SDK](https://github.com/baking-bad/tezos-etherlink-bridge-ts-sdk?tab=readme-ov-file). This demo demonstrates how the SDK can be utilized in a UI application.

## Requirements

- [Node.js and npm](https://nodejs.org/) installed on your system.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:skubarenko/tezos-etherlink-bridge-ts-sdk-demo.git
   cd tezos-etherlink-bridge-ts-sdk-demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Generate Certificates

To run the app in HTTPS mode (required by wallets for secure connections), you need to generate a self-signed certificate:

1. **Install [OpenSSL](https://openssl.org/)**

2. **Create a `certificates` directory**:
   ```bash
   mkdir certificates
   ```

3. **Generate the certificate**:
   Run the following command in the root of the repository:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
       -keyout certificates/localhost.key \
       -out certificates/localhost.crt \
       -subj "/CN=localhost"
   ```

### Start the Development Server

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   https://localhost:3000/
   ```

> **Note**: Since the certificate is self-signed, your browser may display a warning about the connection not being secure. You can safely proceed for local development.

