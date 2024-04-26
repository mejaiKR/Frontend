import {SERVER_URL} from "./src/lib/utils";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [SERVER_URL, 'localhost'], // 로컬호스트 도메인 임시로 추가
	},
}
export default nextConfig
