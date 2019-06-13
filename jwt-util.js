const jwt = require('node-webtokens');
const chalk = require('chalk');
const args = process.argv;
let msg;

const JwtUtil = {
	getBase64EncryptionKey: function(key) {
		return Buffer.from(key).toString('base64');
	},

	createJWToken(payload, encKey, encAlgorithm, encMethod, expirationTime) {
		if (!payload) {
			return null;
		}
		let token;
		try {
			let payloadObj = JSON.parse(payload);
			console.log(payloadObj);
			if (expirationTime && parseInt(expirationTime) > 0) {
				payloadObj.iat = Date.now() / 1000 | 0 + parseInt(expirationTime);
			}
			token = jwt.generate(encAlgorithm,
				encMethod, payloadObj, this.getBase64EncryptionKey(encKey));
		} catch (e) {
			console.log(e);
			return token = '';
		}
		return token;
	},

	updateJWToken(token, additionalPayload, encKey, encAlgorithm, encMethod, expireIn) {
		if (!token || !additionalPayload) {
			return token;
		}
		let payload = jwt.parse(token).verify(this.getBase64EncryptionKey(encKey)).payload;
		let additionalObj = JSON.parse(additionalPayload);
		for(let key in additionalObj) {
			payload[key] = additionalObj[key];
		}

		return this.createJWToken(JSON.stringify(payload), encKey, encAlgorithm, encMethod, expireIn);
	},

	decryptJWToken(token, encKey) {
		try {
			return JSON.stringify(jwt.parse(token).verify(this.getBase64EncryptionKey(encKey)).payload);
		} catch (e) {
			console.log();
			console.log(chalk.red('invalid / expired jwtoken'));
			return '';
		}
	}
};

module.exports = JwtUtil;
