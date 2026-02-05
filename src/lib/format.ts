export function formatBytes(bytes: number, decimals: number = 2): string {
	if (bytes === 0) return '0 Bytes';

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	const i = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(Math.max(decimals, 0)))} ${sizes[i]}`;
}

export function capitalizeFirstLetter(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
