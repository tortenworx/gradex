if ! command -v pnpm 2>&1 >/dev/null
then
    curl -fsSL https://get.pnpm.io/install.sh | SHELL=`which bash` bash -
    . ~/.bashrc
fi

pnpm install
pnpm install dotenv
NODE_ENV=production node dist/main.js