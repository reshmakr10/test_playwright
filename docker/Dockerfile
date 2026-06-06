FROM mcr.microsoft.com/playwright:focal

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci
RUN npx playwright install --with-deps

COPY api-tests/requirements.txt ./api-tests/requirements.txt
RUN python3 -m pip install --no-cache-dir -r api-tests/requirements.txt

COPY . .

ENV CI=true
CMD ["bash"]
