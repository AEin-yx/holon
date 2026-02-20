FROM node:24.13.0-trixie-slim 

WORKDIR /gatekeeper
RUN adduser -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /gatekeeper

USER nodejs

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci 
RUN npx prisma generate

COPY . .
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "app.js"]
