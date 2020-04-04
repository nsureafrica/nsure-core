const UserId = 12

const encodedString = Buffer.from(`{"UserId":${UserId}}`).toString('base64')

console.log(encodedString)