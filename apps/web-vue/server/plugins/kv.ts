import cloudflareKVHTTPDriver from "unstorage/drivers/cloudflare-kv-http";

export default defineNitroPlugin(() => {
    const storage = useStorage()
    const cloudflare = cloudflareKVHTTPDriver({
            namespaceId: '0b04086959194f5eadb942b3bccde075',
            accountId: 'f5e1b8977860c5d6604afd4815ccdf3f',
            apiToken: 'OApR1bRgqxX9MjxIaFk8SYAeDp7OZjI9d09cAsME',
        })
    storage.mount('kv', cloudflare)
})