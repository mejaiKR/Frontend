
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [process.env.NEXT_PUBLIC_SERVER_URL, 'localhost'], // 로컬호스트 도메인 임시로 추가
	},
}
export default nextConfig
