const axios = require("axios");

const fetch = require("node-fetch");
const { google } = require("googleapis");
const express = require("express");
const app = express();

//#region CONSTANTS

const iGoogle_Client_ID =
	"143776365466-ftc0ee4i0hab82mem0cs3ssfo4qqlh28.apps.googleusercontent.com";

const iGoogle_Client_Secret = "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";

// const iGoogle_Redirect_URL =
// 	"https://app.contenterp.com/api/contents/doc/auth/google/callback";

const iGoogle_Redirect_URL = "http://localhost:3000/auth/google/callback";

let iGoogle_Code;
let iGoogle_UAuthorizationHeader;
let iGoogle_oAuthBearer;
let iGoogle_Access_Token;
let iGoogle_Refresh_Token;

const oAuth2Client = new google.auth.OAuth2(
	iGoogle_Client_ID,
	iGoogle_Client_Secret,
	iGoogle_Redirect_URL
);

//#endregion

//#region AUTHORIZE

app.get("/auth/google", (req, res) => {
	const url = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/drive",
			"https://www.googleapis.com/auth/drive.file",
			"https://www.googleapis.com/auth/drive.appdata",
		],
	});
	res.redirect(url);
});

//#endregion

//#region CALLBACK

app.get("/auth/google/callback", function (req, res) {
	try {
		// Get the authorization code from the user
		iGoogle_Code = req.query.code;
		console.log("*** - iGoogle|iGoogle_Code code: " + iGoogle_Code);

		////////////////////////////////////////

		oAuth2Client.getToken(iGoogle_Code, async function (err, tokenInfo) {
			/*
			IF-ERROR */
			if (err) {
				res.end(JSON.stringify(err));
				return;
			}

			console.log("*** - Google tokenInfo: " + tokenInfo);

			//iGoogle_Access_Token = tokenInfo.id_token;
			console.log("*** - Google id_token: " + tokenInfo.id_token);

			iGoogle_oAuthBearer = tokenInfo.access_token;
			console.log(
				"*** - iGoogle|iGoogle_oAuthBearer access_token: " +
					tokenInfo.access_token
			);

			// Set OAuth
			oAuth2Client.setCredentials(tokenInfo);

			// Create Doc
			CERP_CREATE_Document(req, res);

			// ...
		});
	} catch (error) {
		console.error(error);
	}
});

//#endregion

//#region DOC-NEW

async function CERP_CREATE_Document(req, res) {
	try {
		// Set Header
		var headers = {
			Authorization: `Bearer ${iGoogle_oAuthBearer}`,
		};

		console.log("*** - Google-headers : " + headers);

		// Get Doc-Name
		var docTokenID = "doc_" + new Date().getTime();

		let payloads = {
			name: docTokenID,
			mimeType: "application/vnd.google-apps.document",
		};

		console.log("*** - Google-payloads : " + payloads);

		var options = {
			contentType: "application/json",
			method: "post",
			headers: headers, //,
			body: JSON.stringify(payloads), //here this is how you send your datas
		};

		console.log("*** - Google-options : " + options);

		axios
			//.headers = headers
			.post(
				"https://www.googleapis.com/drive/v3/files",
				{
					name: docTokenID,
					mimeType: "application/vnd.google-apps.document",
				},
				{
					headers: headers,
				}
			)
			.then(function (response) {
				//console.log(response);

				console.log("*** - Google-response : " + response.data);

				res
					//.setHeader("Content-Type", "application/json")

					.send(response.data);
			});

 
		// ...
	} catch (error) {
		console.log(error);
	}
}

//#endregion

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
