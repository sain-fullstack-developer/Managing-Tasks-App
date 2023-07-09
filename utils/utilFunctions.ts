export function createUniqueRandomId() {
	const randomNumber = Math.random() * 100000000;
	const randomString = String(randomNumber);
	const uniqueId = randomString.replace(".", "").replace("0", "");
	return uniqueId;
}
