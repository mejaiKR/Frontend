
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [`${process.env.NEXT_PUBLIC_SERVER_URL}`,`${process.env.NEXT_PUBLIC_S3_URL}`, 'localhost'], // 로컬호스트 도메인 임시로 추가
	},
	async rewrites() {
		if (process.env.NODE_ENV !== "development") {
			return [];
		}
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
			},
		];
	},
}
export default nextConfig
