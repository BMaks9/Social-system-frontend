const target_tauri = true

export const api_proxy_addr = "https://192.168.56.1:8000"

export const img_proxy_addr = "https://127.0.0.1:9000"

export const dest_api = (target_tauri) ? api_proxy_addr : ""
export const dest_img =  (target_tauri) ?  img_proxy_addr : ""

export const dest_root = (target_tauri) ? "" : "/Social-system-frontend"