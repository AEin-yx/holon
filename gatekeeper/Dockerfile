FROM node:24.13.0-trixie-slim

WORKDIR /gatekeeper


COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production
RUN npx prisma generate


COPY . .
RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp && chown -R nodeapp:nodeapp /gatekeeper

USER nodeapp

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["sh", "-c", "npx prisma migrate deploy && node app.js"]