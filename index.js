const fetch = require("node-fetch");
const { google } = require("googleapis");
const express = require("express");
const app = express();

const CLIENT_ID =
	"640022331087-guvoedpuc4e4graee2u1vr4eedpuootu.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:3000/auth/google/callback";

// const CLIENT_ID = "YOUR_CLIENT_ID";
// const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
// const REDIRECT_URL = "YOUR_REDIRECT_URL";
const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
);

app.get("/auth/google", (req, res) => {
	const url = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/drive",
			"https://www.googleapis.com/auth/drive.file",
			"https://www.googleapis.com/auth/drive.appdata",
		],
	});
	res.redirect(url);
});

// app.get("/auth/google/callback", async (req, res) => {
// 	const { tokens } = await oAuth2Client.getToken(req.query.code);
// 	oAuth2Client.setCredentials(tokens);
// 	res.send("Authentication successful!");
// });

//"/api/google/callback/oauth"

app.get("/auth/google/callback", function (req, res) {
	try {
		// Get the authorization code from the user
		//const code = ... // TODO: prompt the user to visit the URL and enter the code
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

			//	const { tokens } = await oAuth2Client.getToken(code);

			oAuth2Client.setCredentials(tokenInfo);

			CERP_CREATE_Document(req, res);

			///////////////////////////////////

			// // // // try {
			// // // // 	const res = await fetch.get(
			// // // // 		//`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo.access_token}`,
			// // // // 		`https://www.googleapis.com/drive/v3/files?alt=json&access_token=${tokenInfo.access_token}`,
			// // // // 		{
			// // // // 			headers: {
			// // // // 				Authorization: `Bearer ${tokenInfo.access_token}`,
			// // // // 			},
			// // // // 		}
			// // // // 	);

			// // // // 	console.log("*** - Google res.data: " + res.data);

			// // // // 	//return res.data;
			// // // // } catch (error) {
			// // // // 	console.log(error, "Error fetching Google user");
			// // // // 	throw new Error(error.message);
			// // // // }

			// // // // // // // // Create a drive object
			// // // // // // // const drive = google.drive({ version: "v3", oAuth2Client });

			// // // // // // // console.log("*** - drive: " + drive);

			// // // // // // // // Define the document name and content
			// // // // // // // const filename = "Onthemove62";
			// // // // // // // const content = "Hello, world!";

			// // // // // // // // Create a new document with the given name and content
			// // // // // // // const fileMetadata = {
			// // // // // // // 	name: filename,
			// // // // // // // 	mimeType: "application/vnd.google-apps.document",
			// // // // // // // };

			// // // // // // // const media = {
			// // // // // // // 	mimeType: "text/plain",
			// // // // // // // 	body: content,
			// // // // // // // };

			// // // // // // // // Upload the document to Google Drive
			// // // // // // // const res = await drive.files.create({
			// // // // // // // 	requestBody: fileMetadata,
			// // // // // // // 	media: media,
			// // // // // // // 	fields: "id",
			// // // // // // // });

			// // // // // // // console.log("*** - res: " + res);

			//////////////////////////////
		});

		// Create a new document in Google Drive
		// // // // // // // // const drive = google.drive({ version: "v3", oAuth2Client });
		// // // // // // // // const fileMetadata = {
		// // // // // // // // 	name: "My Document 2023",
		// // // // // // // // 	mimeType: "application/vnd.google-apps.document",
		// // // // // // // // };
		// // // // // // // // const res = drive.files.create({
		// // // // // // // // 	resource: fileMetadata,
		// // // // // // // // 	fields: "id",
		// // // // // // // // });
		// // // // // // // // console.log("File ID: ", res.data.id);

		//res.send("Authentication successful!  ***  res.data.id == " + res.data.id);
		/////////////////////////////////////////////////res.send("Authentication successful!");
	} catch (error) {
		console.error(error);
	}

	///////////////////////////

	// var code = req.query.code;

	// oAuth2Client.getToken(code, async function (err, tokenInfo) {
	// 	if (err) {
	// 		res.end(JSON.stringify(err));
	// 		return;
	// 	}

	// 	console.log("*** - Google id_token: " + tokenInfo.id_token);

	// 	console.log("*** - Google token: " + tokenInfo.access_token);

	// 	const { tokens } = await oAuth2Client.getToken(code);

	// 	oAuth2Client.setCredentials(tokens);

	// 	// var tokenSession = new token(req.session);
	// 	// tokenSession.setGoogleToken(tokenInfo.access_token);
	// 	//	res.redirect("/");

	// 	////////////////////////////////////////

	// 	// Create a drive object
	// 	const drive = google.drive({ version: "v3", oAuth2Client });

	// 	console.log("*** - drive: " + drive);

	// 	// Define the document name and content
	// 	const filename = "Onthemove62";
	// 	const content = "Hello, world!";

	// 	// Create a new document with the given name and content
	// 	const fileMetadata = {
	// 		name: filename,
	// 		mimeType: "application/vnd.google-apps.document",
	// 	};

	// 	const media = {
	// 		mimeType: "text/plain",
	// 		body: content,
	// 	};

	// 	// Upload the document to Google Drive
	// 	const res = await drive.files.create({
	// 		requestBody: fileMetadata,
	// 		media: media,
	// 		fields: "id",
	// 	});

	// 	console.log("*** - res: " + res);

	// 	//////////////////////////////
	// });

	// //"Authentication successful! *** " +
	// res.send(res);
});

app.get("/auth/google/callback_XXX", function (req, res) {
	var code = req.query.code;

	oAuth2Client.getToken(code, async function (err, tokenInfo) {
		if (err) {
			res.end(JSON.stringify(err));
			return;
		}

		console.log("*** - Google id_token: " + tokenInfo.id_token);

		console.log("*** - Google token: " + tokenInfo.access_token);

		const { tokens } = await oAuth2Client.getToken(code);

		oAuth2Client.setCredentials(tokens);

		// var tokenSession = new token(req.session);
		// tokenSession.setGoogleToken(tokenInfo.access_token);
		//	res.redirect("/");

		////////////////////////////////////////

		// Create a drive object
		const drive = google.drive({ version: "v3", oAuth2Client });

		console.log("*** - drive: " + drive);

		// Define the document name and content
		const filename = "Onthemove62";
		const content = "Hello, world!";

		// Create a new document with the given name and content
		const fileMetadata = {
			name: filename,
			mimeType: "application/vnd.google-apps.document",
		};

		const media = {
			mimeType: "text/plain",
			body: content,
		};

		// Upload the document to Google Drive
		const res = await drive.files.create({
			requestBody: fileMetadata,
			media: media,
			fields: "id",
		});

		console.log("*** - res: " + res);

		//////////////////////////////
	});

	//"Authentication successful! *** " +
	res.send(res);
});

let iGoogle_Code;
const iGoogle_Client_ID =
	"640022331087-guvoedpuc4e4graee2u1vr4eedpuootu.apps.googleusercontent.com";
let iGoogle_Client_Secret = "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";
let iGoogle_UAuthorizationHeader;
let iGoogle_oAuthBearer;
let iGoogle_Access_Token;
let iGoogle_Refresh_Token;

app.get("/fetch", async function (req, res) {
	try {
		iGoogle_Code =
			"4/0AbUR2VMo7wOI3N5x2hQQ0lnIQVzX84IYLu_ZZYn0m8_8kCX72VaHQRub6OjdG17d7jHaEA";

		var options = {
			contentType: "application/x-www-form-urlencoded",
			method: "post",
			code: iGoogle_Code,
			grant_type: "authorization_code",
			redirect_uri: "http://localhost:3000/auth/google/callback",
			//headers: headers, //,
			//"payload": '{"email": "shannon@gmail.com","password": "123321123"}'
		};

		var response = await fetch("https://oauth2.googleapis.com/token", options);

		console.log(
			`response.ok ==  ${response.ok} , status ==  ${response.status}`
		);

		const xJSON = await response.json();

		console.log("response-fetch-xJSON == " + xJSON);

		console.log("response-fetch-xJSON == " + xJSON.error_description);

		if (response.ok == true && response.status == 200) {
			res

				.setHeader("Content-Type", "application/json")

				.end(
					JSON.stringify({
						status: response.status,
						message: response.ok,
					})
				);
		} else if (response.ok == false && response.status == 400) {
			res

				.setHeader("Content-Type", "application/json")

				.end(
					JSON.stringify({
						status: response.status,
						message: response.ok,
					})
				);
		}

		//	const xxx = await response.text();

		//	console.log("response-fetch == " + xxx);

		// if (!response.ok) {
		// 	throw new Error(`Error! status: ${response.status}`);
		// }

		// ✅ call response.json() here
		// const result = await response.json();

		// console.log("response-fetch-result == " + result);

		// console.log("response-fetch-result.error == " + result.error);

		//.then((response) => response.json())
		// .then((response) => {
		// 	//response();
		// 	console.log("response-fetch == " + response);
		// });
		// .then((data) => {
		// 	console.log("data == " + data);
		// });

		// 	.then((response) => {
		// 	response.json();
		// 	console.log("\n\n*** responseXXX == " + response.json());
		// }

		//);

		//const data = await response.json();

		//console.log(data);
		//  var response = UrlFetchApp.fetch("https://app.contenterp.com/api/contents/64107c5a77d642bc6c4a7be7", options);

		//const text = await response.text();
		//console.log(text);

		//console.log("\n\n*** response == " + response.text());

		// var jsonContent = JSON.parse(response);

		// console.log("\n\n*** jsonContent == " + jsonContent);

		// console.log("\n\n*** access_token == " + access_token);

		// const response = await fetch("http://example.com/movies.json");

		// const jsonData = await response.json();

		// console.log(jsonData);

		//res.send("responseX");
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				a: 1,
				message: "true",
				doc_id: "1101",
			})
		);
		//res.JSON(new JSON(`{messae:"true",doc_id= "1101"}`));
	} catch (error) {
		console.log(error);
	}
});

app.get("/fetchX", async function (req, res) {
	try {
		iGoogle_Code =
			"4/0AbUR2VOCl1bENp9DAeD2sHFwXJjg2xD51zVlYR6ZZnVlcSjlVwMvCIsr4k_w22_i1VWORQ";

		var options = {
			contentType: "application/x-www-form-urlencoded",
			method: "post",
			code: iGoogle_Code,
			grant_type: "authorization_code",
			redirect_uri: "http://localhost:3000/auth/google/callback",
			//headers: headers, //,
			//"payload": '{"email": "shannon@gmail.com","password": "123321123"}'
		};

		var response = await fetch("https://oauth2.googleapis.com/token", options);

		console.log(
			`response.ok ==  ${response.ok} , status ==  ${response.status}`
		);

		const xJSON = await response.json();

		console.log("response-fetch-xJSON == " + xJSON);

		console.log("response-fetch-xJSON == " + xJSON.error_description);

		//	const xxx = await response.text();

		//	console.log("response-fetch == " + xxx);

		// if (!response.ok) {
		// 	throw new Error(`Error! status: ${response.status}`);
		// }

		// ✅ call response.json() here
		// const result = await response.json();

		// console.log("response-fetch-result == " + result);

		// console.log("response-fetch-result.error == " + result.error);

		//.then((response) => response.json())
		// .then((response) => {
		// 	//response();
		// 	console.log("response-fetch == " + response);
		// });
		// .then((data) => {
		// 	console.log("data == " + data);
		// });

		// 	.then((response) => {
		// 	response.json();
		// 	console.log("\n\n*** responseXXX == " + response.json());
		// }

		//);

		//const data = await response.json();

		//console.log(data);
		//  var response = UrlFetchApp.fetch("https://app.contenterp.com/api/contents/64107c5a77d642bc6c4a7be7", options);

		//const text = await response.text();
		//console.log(text);

		//console.log("\n\n*** response == " + response.text());

		// var jsonContent = JSON.parse(response);

		// console.log("\n\n*** jsonContent == " + jsonContent);

		// console.log("\n\n*** access_token == " + access_token);

		// const response = await fetch("http://example.com/movies.json");

		// const jsonData = await response.json();

		// console.log(jsonData);

		//res.send("responseX");
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				a: 1,
				message: "true",
				doc_id: "1101",
			})
		);
		//res.JSON(new JSON(`{messae:"true",doc_id= "1101"}`));
	} catch (error) {
		console.log(error);
	}
});

app.get("/create", function (req, res) {
	try {
		CERP_CREATE_Document(req, res);
	} catch (error) {
		console.log(error);
	}
});

async function CERP_GET_oAUTHLLoginCode() {}

async function CERP_GET_oAUTHAccessToken() {}

async function CERP_CREATE_Document(req, res) {
	try {
		// iGoogle_oAuthBearer =
		// 	"ya29.a0AWY7CklFQT9lSiqdsKVKJRJdfvAlZ20aAbap7ldRnXEHJFojzK_Wp-t79esus-ngRXD86tdhHXZaAbWhNWtQ95v9TflDnyULAfu0Pk_Za9RP32Oh9X9aXa4aS6x8H85dxGe1D5tZQkbqiaYTN2-FZkdq-y0MaCgYKARgSARMSFQG1tDrpKC9RA2xcgKIogXGmnpkO0A0163";

		var headers = {
			Authorization: `Bearer ${iGoogle_oAuthBearer}`,
		};

		let payloads = {
			name: "FARES_MOHAB_2024",
			mimeType: "application/vnd.google-apps.document",
		};

		var options = {
			contentType: "application/json",
			//contentType: "application/x-www-form-urlencoded",
			method: "post",
			//code: iGoogle_Code,
			//grant_type: "authorization_code",
			//redirect_uri: "http://localhost:3000/auth/google/callback",
			headers: headers, //,
			body: JSON.stringify(payloads), //here this is how you send your datas
			//payload: payloads, //,
			//"payload": '{"email": "shannon@gmail.com","password": "123321123"}'
		};

		var response = await fetch(
			"https://www.googleapis.com/drive/v3/files",
			options
		);

		const xJSON = await response.json();

		res

			.setHeader("Content-Type", "application/json")

			.end(JSON.stringify(xJSON));

		// // // // // console.log(
		// // // // // 	`response.ok ==  ${response.ok} , status ==  ${response.status}`
		// // // // // );

		// // // // //

		// // // // // console.log("\n\nresponse-fetch-xJSON == " + xJSON);

		/*
		//{"error":{"code":401,"message":"Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.","errors":[{"message":"Invalid Credentials","domain":"global","reason":"authError","location":"Authorization","locationType":"header"}],"status":"UNAUTHENTICATED"}}
	  ERROR
		
		console.log("\n\nresponse-fetch-xJSON.code == " + xJSON.error.code);

		console.log("\n\nresponse-fetch-xJSON.messsage == " + xJSON.error.message);
		
		*/
		///////////////////////////////////

		//console.log("response-fetch-xJSON == " + xJSON.error_description);

		/////////////res.JSON(new JSON(`{messae:"true",doc_id= "1101"}`));

		////////////////////////////////////////////////
		////////////////////////////////////////////////res.end(JSON.stringify(xJSON));
		////////////////////////////////////////////////

		//	const xxx = await response.text();

		//	console.log("response-fetch == " + xxx);

		// if (!response.ok) {
		// 	throw new Error(`Error! status: ${response.status}`);
		// }

		// ✅ call response.json() here
		// const result = await response.json();

		// console.log("response-fetch-result == " + result);

		// console.log("response-fetch-result.error == " + result.error);

		//.then((response) => response.json())
		// .then((response) => {
		// 	//response();
		// 	console.log("response-fetch == " + response);
		// });
		// .then((data) => {
		// 	console.log("data == " + data);
		// });

		// 	.then((response) => {
		// 	response.json();
		// 	console.log("\n\n*** responseXXX == " + response.json());
		// }

		//);

		//const data = await response.json();

		//console.log(data);
		//  var response = UrlFetchApp.fetch("https://app.contenterp.com/api/contents/64107c5a77d642bc6c4a7be7", options);

		//const text = await response.text();
		//console.log(text);

		//console.log("\n\n*** response == " + response.text());

		// var jsonContent = JSON.parse(response);

		// console.log("\n\n*** jsonContent == " + jsonContent);

		// console.log("\n\n*** access_token == " + access_token);

		// const response = await fetch("http://example.com/movies.json");

		// const jsonData = await response.json();

		// console.log(jsonData);
	} catch (error) {
		console.log(error);
	}
}

async function CERP_CREATE_Document_X1(req, res) {
	try {
		//
		iGoogle_oAuthBearer =
			"ya29.a0AWY7CklFQT9lSiqdsKVKJRJdfvAlZ20aAbap7ldRnXEHJFojzK_Wp-t79esus-ngRXD86tdhHXZaAbWhNWtQ95v9TflDnyULAfu0Pk_Za9RP32Oh9X9aXa4aS6x8H85dxGe1D5tZQkbqiaYTN2-FZkdq-y0MaCgYKARgSARMSFQG1tDrpKC9RA2xcgKIogXGmnpkO0A0163";

		var headers = {
			Authorization: `Bearer ${iGoogle_oAuthBearer}`,
			//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbm5vbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNjQwZjk2ZTc5ZTgyOTc3YjU5NGE4YWYyIiwicm9sZSI6Ik93bmVyIiwicmVzcG9uc2libGVfc2l0ZXMiOlt7Im5hbWUiOiJXVEdNIiwidXJsIjoid3d3LldoYXRUb0dldE15LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3N2Y3IiwiX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3ODAyIn0seyJuYW1lIjoidGhpcyBhbmQgdGhhdCIsInVybCI6Ind3dy50aGlzYW5kdGhhdC5jb20iLCJpc19yZXNwb25zaWJsZSI6dHJ1ZSwic2l0ZV9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFkNyIsIl9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFlMiJ9XSwiJF9fIjp7ImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImFjY2Vzc19wZXJtaXNzaW9ucyI6ImluaXQiLCJyZXZlbnVlX21ldGhvZHMiOiJpbml0IiwiZXhwZW5zZV9tZXRob2RzIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJmaXJzdF9uYW1lIjoiaW5pdCIsImxhc3RfbmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJudW1iZXJfb2Zfc2l0ZXMiOiJpbml0IiwibnVtYmVyX29mX2NvbnRlbnRzIjoiaW5pdCIsIm51bWJlcl9vZl90ZWFtcyI6ImluaXQiLCJudW1iZXJfb2ZfY29fb3duZXIiOiJpbml0IiwicmVzcG9uc2libGVfc2l0ZXMiOiJpbml0IiwiaXNfYWN0aXZlIjoiaW5pdCIsImlzX3N1cGVydXNlciI6ImluaXQiLCJyb2xlIjoiaW5pdCIsImlzX2ZpcnN0X293bmVyIjoiaW5pdCIsInRlYW1zIjoiaW5pdCIsInByb2ZpbGVfaW1hZ2UiOiJpbml0IiwiY3JlYXRvcl9pZCI6ImluaXQiLCJzZXR0aW5ncy5pc1NpZGViYXJPcGVuZWQiOiJtb2RpZnkiLCJhc3NpZ25lZF9jb250ZW50cyI6ImluaXQiLCJhYm5vcm1hbF9wZW5kaW5nX2NvbnRlbnRzIjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJwYXltZW50X21ldGhvZCI6ImluaXQiLCJzZXR0aW5ncyI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiZmlyc3RfbmFtZSI6dHJ1ZSwibGFzdF9uYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibnVtYmVyX29mX3NpdGVzIjp0cnVlLCJudW1iZXJfb2ZfY29udGVudHMiOnRydWUsIm51bWJlcl9vZl90ZWFtcyI6dHJ1ZSwibnVtYmVyX29mX2NvX293bmVyIjp0cnVlLCJyZXNwb25zaWJsZV9zaXRlcyI6dHJ1ZSwiaXNfYWN0aXZlIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGUiOnRydWUsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6dHJ1ZSwicHJvZmlsZV9pbWFnZSI6dHJ1ZSwiY3JlYXRvcl9pZCI6dHJ1ZSwiYWNjZXNzX3Blcm1pc3Npb25zIjp0cnVlLCJhc3NpZ25lZF9jb250ZW50cyI6dHJ1ZSwiYWJub3JtYWxfcGVuZGluZ19jb250ZW50cyI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJyZXZlbnVlX21ldGhvZHMiOnRydWUsImV4cGVuc2VfbWV0aG9kcyI6dHJ1ZSwicGF5bWVudF9tZXRob2QiOnRydWUsInNldHRpbmdzIjp0cnVlfSwibW9kaWZ5Ijp7InNldHRpbmdzLmlzU2lkZWJhck9wZW5lZCI6dHJ1ZX19fSwic2tpcElkIjp0cnVlLCJzZWxlY3RlZCI6eyJwYXNzd29yZCI6MH0sImV4Y2x1ZGUiOnRydWUsIm9wIjoidmFsaWRhdGUiLCJzYXZpbmciOnt9LCIkdmVyc2lvbkVycm9yIjpudWxsLCJzYXZlT3B0aW9ucyI6e30sInZhbGlkYXRpbmciOnt9fSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJzZXR0aW5ncyI6eyJpc1NpZGViYXJPcGVuZWQiOnRydWV9LCJfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJmaXJzdF9uYW1lIjoiU2hhbm5vbiIsImxhc3RfbmFtZSI6IktlbXBlbmljaCIsImVtYWlsIjoic2hhbm5vbkBnbWFpbC5jb20iLCJudW1iZXJfb2Zfc2l0ZXMiOjIsIm51bWJlcl9vZl9jb250ZW50cyI6MTUsIm51bWJlcl9vZl90ZWFtcyI6MiwibnVtYmVyX29mX2NvX293bmVyIjowLCJyZXNwb25zaWJsZV9zaXRlcyI6W3sibmFtZSI6IldUR00iLCJ1cmwiOiJ3d3cuV2hhdFRvR2V0TXkuY29tIiwiaXNfcmVzcG9uc2libGUiOnRydWUsInNpdGVfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc3ZjciLCJfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc4MDIifSx7Im5hbWUiOiJ0aGlzIGFuZCB0aGF0IiwidXJsIjoid3d3LnRoaXNhbmR0aGF0LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWQ3IiwiX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWUyIn1dLCJpc19hY3RpdmUiOnRydWUsImlzX3N1cGVydXNlciI6ZmFsc2UsInJvbGUiOiJPd25lciIsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6W3siX2lkIjoiNjQxMGU3NjU3N2Q2NDJiYzZjNGE5Mjc3In0seyJfaWQiOiI2NDQyYmM3MjY0Yzk0ZTMxMmYwZTNhNGYifV0sInByb2ZpbGVfaW1hZ2UiOiJwaS0wMDY0MGY5NmU3OWU4Mjk3N2I1OTRhOGFmMiIsImNyZWF0b3JfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJhY2Nlc3NfcGVybWlzc2lvbnMiOltdLCJhc3NpZ25lZF9jb250ZW50cyI6W10sImFibm9ybWFsX3BlbmRpbmdfY29udGVudHMiOltdLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA1VDIxOjAzOjM0Ljc2N1oiLCJyZXZlbnVlX21ldGhvZHMiOlsiQWR0aHJpdmUiLCJNZWRpYXZpbmUiLCJBbWF6b24gQXNzb2NpYXRlcyIsIlNoYXJlQVNhbGUiLCJDbGlja2JhbmsiXSwiZXhwZW5zZV9tZXRob2RzIjpbIkNvbnRlbnQgSW52ZXN0bWVudCJdLCJwYXltZW50X21ldGhvZCI6eyJtZXRob2QiOiJ0aW1lLWJhc2VkIiwiaG91cmx5UmF0ZSI6MCwid29yZENvdW50UmF0ZSI6MCwiYXJ0aWNsZVJhdGUiOjAsInByb2Nlc3Nvcl9mZWUiOjAsIl9pZCI6IjY0NmY3YmRjODY3OWJjZDM5NTZmNGNmZiJ9fSwiaWF0IjoxNjg1OTk5MjE1LCJhdWQiOiJjb250ZW50RVJQOmF1dGgifQ.433LZCeqtmJvLudOwZDKstqBhEZjK6kT9H0H08pMwsk","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbm5vbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNjQwZjk2ZTc5ZTgyOTc3YjU5NGE4YWYyIiwicm9sZSI6Ik93bmVyIiwicmVzcG9uc2libGVfc2l0ZXMiOlt7Im5hbWUiOiJXVEdNIiwidXJsIjoid3d3LldoYXRUb0dldE15LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3N2Y3IiwiX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3ODAyIn0seyJuYW1lIjoidGhpcyBhbmQgdGhhdCIsInVybCI6Ind3dy50aGlzYW5kdGhhdC5jb20iLCJpc19yZXNwb25zaWJsZSI6dHJ1ZSwic2l0ZV9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFkNyIsIl9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFlMiJ9XSwiJF9fIjp7ImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImFjY2Vzc19wZXJtaXNzaW9ucyI6ImluaXQiLCJyZXZlbnVlX21ldGhvZHMiOiJpbml0IiwiZXhwZW5zZV9tZXRob2RzIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJmaXJzdF9uYW1lIjoiaW5pdCIsImxhc3RfbmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJudW1iZXJfb2Zfc2l0ZXMiOiJpbml0IiwibnVtYmVyX29mX2NvbnRlbnRzIjoiaW5pdCIsIm51bWJlcl9vZl90ZWFtcyI6ImluaXQiLCJudW1iZXJfb2ZfY29fb3duZXIiOiJpbml0IiwicmVzcG9uc2libGVfc2l0ZXMiOiJpbml0IiwiaXNfYWN0aXZlIjoiaW5pdCIsImlzX3N1cGVydXNlciI6ImluaXQiLCJyb2xlIjoiaW5pdCIsImlzX2ZpcnN0X293bmVyIjoiaW5pdCIsInRlYW1zIjoiaW5pdCIsInByb2ZpbGVfaW1hZ2UiOiJpbml0IiwiY3JlYXRvcl9pZCI6ImluaXQiLCJzZXR0aW5ncy5pc1NpZGViYXJPcGVuZWQiOiJtb2RpZnkiLCJhc3NpZ25lZF9jb250ZW50cyI6ImluaXQiLCJhYm5vcm1hbF9wZW5kaW5nX2NvbnRlbnRzIjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJwYXltZW50X21ldGhvZCI6ImluaXQiLCJzZXR0aW5ncyI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiZmlyc3RfbmFtZSI6dHJ1ZSwibGFzdF9uYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibnVtYmVyX29mX3NpdGVzIjp0cnVlLCJudW1iZXJfb2ZfY29udGVudHMiOnRydWUsIm51bWJlcl9vZl90ZWFtcyI6dHJ1ZSwibnVtYmVyX29mX2NvX293bmVyIjp0cnVlLCJyZXNwb25zaWJsZV9zaXRlcyI6dHJ1ZSwiaXNfYWN0aXZlIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGUiOnRydWUsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6dHJ1ZSwicHJvZmlsZV9pbWFnZSI6dHJ1ZSwiY3JlYXRvcl9pZCI6dHJ1ZSwiYWNjZXNzX3Blcm1pc3Npb25zIjp0cnVlLCJhc3NpZ25lZF9jb250ZW50cyI6dHJ1ZSwiYWJub3JtYWxfcGVuZGluZ19jb250ZW50cyI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJyZXZlbnVlX21ldGhvZHMiOnRydWUsImV4cGVuc2VfbWV0aG9kcyI6dHJ1ZSwicGF5bWVudF9tZXRob2QiOnRydWUsInNldHRpbmdzIjp0cnVlfSwibW9kaWZ5Ijp7InNldHRpbmdzLmlzU2lkZWJhck9wZW5lZCI6dHJ1ZX19fSwic2tpcElkIjp0cnVlLCJzZWxlY3RlZCI6eyJwYXNzd29yZCI6MH0sImV4Y2x1ZGUiOnRydWUsIm9wIjoidmFsaWRhdGUiLCJzYXZpbmciOnt9LCIkdmVyc2lvbkVycm9yIjpudWxsLCJzYXZlT3B0aW9ucyI6e30sInZhbGlkYXRpbmciOnt9fSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJzZXR0aW5ncyI6eyJpc1NpZGViYXJPcGVuZWQiOnRydWV9LCJfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJmaXJzdF9uYW1lIjoiU2hhbm5vbiIsImxhc3RfbmFtZSI6IktlbXBlbmljaCIsImVtYWlsIjoic2hhbm5vbkBnbWFpbC5jb20iLCJudW1iZXJfb2Zfc2l0ZXMiOjIsIm51bWJlcl9vZl9jb250ZW50cyI6MTUsIm51bWJlcl9vZl90ZWFtcyI6MiwibnVtYmVyX29mX2NvX293bmVyIjowLCJyZXNwb25zaWJsZV9zaXRlcyI6W3sibmFtZSI6IldUR00iLCJ1cmwiOiJ3d3cuV2hhdFRvR2V0TXkuY29tIiwiaXNfcmVzcG9uc2libGUiOnRydWUsInNpdGVfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc3ZjciLCJfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc4MDIifSx7Im5hbWUiOiJ0aGlzIGFuZCB0aGF0IiwidXJsIjoid3d3LnRoaXNhbmR0aGF0LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWQ3IiwiX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWUyIn1dLCJpc19hY3RpdmUiOnRydWUsImlzX3N1cGVydXNlciI6ZmFsc2UsInJvbGUiOiJPd25lciIsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6W3siX2lkIjoiNjQxMGU3NjU3N2Q2NDJiYzZjNGE5Mjc3In0seyJfaWQiOiI2NDQyYmM3MjY0Yzk0ZTMxMmYwZTNhNGYifV0sInByb2ZpbGVfaW1hZ2UiOiJwaS0wMDY0MGY5NmU3OWU4Mjk3N2I1OTRhOGFmMiIsImNyZWF0b3JfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJhY2Nlc3NfcGVybWlzc2lvbnMiOltdLCJhc3NpZ25lZF9jb250ZW50cyI6W10sImFibm9ybWFsX3BlbmRpbmdfY29udGVudHMiOltdLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA1VDIxOjAzOjM0Ljc2N1oiLCJyZXZlbnVlX21ldGhvZHMiOlsiQWR0aHJpdmUiLCJNZWRpYXZpbmUiLCJBbWF6b24gQXNzb2NpYXRlcyIsIlNoYXJlQVNhbGUiLCJDbGlja2JhbmsiXSwiZXhwZW5zZV9tZXRob2RzIjpbIkNvbnRlbnQgSW52ZXN0bWVudCJdLCJwYXltZW50X21ldGhvZCI6eyJtZXRob2QiOiJ0aW1lLWJhc2VkIiwiaG91cmx5UmF0ZSI6MCwid29yZENvdW50UmF0ZSI6MCwiYXJ0aWNsZVJhdGUiOjAsInByb2Nlc3Nvcl9mZWUiOjAsIl9pZCI6IjY0NmY3YmRjODY3OWJjZDM5NTZmNGNmZiJ9fSwiaWF0IjoxNjg1OTk5MjE1LCJhdWQiOiJjb250ZW50RVJQOmF1dGgifQ.433LZCeqtmJvLudOwZDKstqBhEZjK6kT9H0H08pMwsk",
		};

		// 	var headers = {
		// 	Authorization:
		// 		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbm5vbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNjQwZjk2ZTc5ZTgyOTc3YjU5NGE4YWYyIiwicm9sZSI6Ik93bmVyIiwicmVzcG9uc2libGVfc2l0ZXMiOlt7Im5hbWUiOiJXVEdNIiwidXJsIjoid3d3LldoYXRUb0dldE15LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3N2Y3IiwiX2lkIjoiNjQwZmY0ZGJlYzE3NWQ3ZGE5YmY3ODAyIn0seyJuYW1lIjoidGhpcyBhbmQgdGhhdCIsInVybCI6Ind3dy50aGlzYW5kdGhhdC5jb20iLCJpc19yZXNwb25zaWJsZSI6dHJ1ZSwic2l0ZV9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFkNyIsIl9pZCI6IjY0NzU2MWNhODFjOGU5ZGQyMjA5ZGFlMiJ9XSwiJF9fIjp7ImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImFjY2Vzc19wZXJtaXNzaW9ucyI6ImluaXQiLCJyZXZlbnVlX21ldGhvZHMiOiJpbml0IiwiZXhwZW5zZV9tZXRob2RzIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJmaXJzdF9uYW1lIjoiaW5pdCIsImxhc3RfbmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJudW1iZXJfb2Zfc2l0ZXMiOiJpbml0IiwibnVtYmVyX29mX2NvbnRlbnRzIjoiaW5pdCIsIm51bWJlcl9vZl90ZWFtcyI6ImluaXQiLCJudW1iZXJfb2ZfY29fb3duZXIiOiJpbml0IiwicmVzcG9uc2libGVfc2l0ZXMiOiJpbml0IiwiaXNfYWN0aXZlIjoiaW5pdCIsImlzX3N1cGVydXNlciI6ImluaXQiLCJyb2xlIjoiaW5pdCIsImlzX2ZpcnN0X293bmVyIjoiaW5pdCIsInRlYW1zIjoiaW5pdCIsInByb2ZpbGVfaW1hZ2UiOiJpbml0IiwiY3JlYXRvcl9pZCI6ImluaXQiLCJzZXR0aW5ncy5pc1NpZGViYXJPcGVuZWQiOiJtb2RpZnkiLCJhc3NpZ25lZF9jb250ZW50cyI6ImluaXQiLCJhYm5vcm1hbF9wZW5kaW5nX2NvbnRlbnRzIjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJwYXltZW50X21ldGhvZCI6ImluaXQiLCJzZXR0aW5ncyI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiZmlyc3RfbmFtZSI6dHJ1ZSwibGFzdF9uYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibnVtYmVyX29mX3NpdGVzIjp0cnVlLCJudW1iZXJfb2ZfY29udGVudHMiOnRydWUsIm51bWJlcl9vZl90ZWFtcyI6dHJ1ZSwibnVtYmVyX29mX2NvX293bmVyIjp0cnVlLCJyZXNwb25zaWJsZV9zaXRlcyI6dHJ1ZSwiaXNfYWN0aXZlIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGUiOnRydWUsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6dHJ1ZSwicHJvZmlsZV9pbWFnZSI6dHJ1ZSwiY3JlYXRvcl9pZCI6dHJ1ZSwiYWNjZXNzX3Blcm1pc3Npb25zIjp0cnVlLCJhc3NpZ25lZF9jb250ZW50cyI6dHJ1ZSwiYWJub3JtYWxfcGVuZGluZ19jb250ZW50cyI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJyZXZlbnVlX21ldGhvZHMiOnRydWUsImV4cGVuc2VfbWV0aG9kcyI6dHJ1ZSwicGF5bWVudF9tZXRob2QiOnRydWUsInNldHRpbmdzIjp0cnVlfSwibW9kaWZ5Ijp7InNldHRpbmdzLmlzU2lkZWJhck9wZW5lZCI6dHJ1ZX19fSwic2tpcElkIjp0cnVlLCJzZWxlY3RlZCI6eyJwYXNzd29yZCI6MH0sImV4Y2x1ZGUiOnRydWUsIm9wIjoidmFsaWRhdGUiLCJzYXZpbmciOnt9LCIkdmVyc2lvbkVycm9yIjpudWxsLCJzYXZlT3B0aW9ucyI6e30sInZhbGlkYXRpbmciOnt9fSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJzZXR0aW5ncyI6eyJpc1NpZGViYXJPcGVuZWQiOnRydWV9LCJfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJmaXJzdF9uYW1lIjoiU2hhbm5vbiIsImxhc3RfbmFtZSI6IktlbXBlbmljaCIsImVtYWlsIjoic2hhbm5vbkBnbWFpbC5jb20iLCJudW1iZXJfb2Zfc2l0ZXMiOjIsIm51bWJlcl9vZl9jb250ZW50cyI6MTUsIm51bWJlcl9vZl90ZWFtcyI6MiwibnVtYmVyX29mX2NvX293bmVyIjowLCJyZXNwb25zaWJsZV9zaXRlcyI6W3sibmFtZSI6IldUR00iLCJ1cmwiOiJ3d3cuV2hhdFRvR2V0TXkuY29tIiwiaXNfcmVzcG9uc2libGUiOnRydWUsInNpdGVfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc3ZjciLCJfaWQiOiI2NDBmZjRkYmVjMTc1ZDdkYTliZjc4MDIifSx7Im5hbWUiOiJ0aGlzIGFuZCB0aGF0IiwidXJsIjoid3d3LnRoaXNhbmR0aGF0LmNvbSIsImlzX3Jlc3BvbnNpYmxlIjp0cnVlLCJzaXRlX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWQ3IiwiX2lkIjoiNjQ3NTYxY2E4MWM4ZTlkZDIyMDlkYWUyIn1dLCJpc19hY3RpdmUiOnRydWUsImlzX3N1cGVydXNlciI6ZmFsc2UsInJvbGUiOiJPd25lciIsImlzX2ZpcnN0X293bmVyIjp0cnVlLCJ0ZWFtcyI6W3siX2lkIjoiNjQxMGU3NjU3N2Q2NDJiYzZjNGE5Mjc3In0seyJfaWQiOiI2NDQyYmM3MjY0Yzk0ZTMxMmYwZTNhNGYifV0sInByb2ZpbGVfaW1hZ2UiOiJwaS0wMDY0MGY5NmU3OWU4Mjk3N2I1OTRhOGFmMiIsImNyZWF0b3JfaWQiOiI2NDBmOTZlNzllODI5NzdiNTk0YThhZjIiLCJhY2Nlc3NfcGVybWlzc2lvbnMiOltdLCJhc3NpZ25lZF9jb250ZW50cyI6W10sImFibm9ybWFsX3BlbmRpbmdfY29udGVudHMiOltdLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA1VDIxOjAzOjM0Ljc2N1oiLCJyZXZlbnVlX21ldGhvZHMiOlsiQWR0aHJpdmUiLCJNZWRpYXZpbmUiLCJBbWF6b24gQXNzb2NpYXRlcyIsIlNoYXJlQVNhbGUiLCJDbGlja2JhbmsiXSwiZXhwZW5zZV9tZXRob2RzIjpbIkNvbnRlbnQgSW52ZXN0bWVudCJdLCJwYXltZW50X21ldGhvZCI6eyJtZXRob2QiOiJ0aW1lLWJhc2VkIiwiaG91cmx5UmF0ZSI6MCwid29yZENvdW50UmF0ZSI6MCwiYXJ0aWNsZVJhdGUiOjAsInByb2Nlc3Nvcl9mZWUiOjAsIl9pZCI6IjY0NmY3YmRjODY3OWJjZDM5NTZmNGNmZiJ9fSwiaWF0IjoxNjg1OTk5MjE1LCJhdWQiOiJjb250ZW50RVJQOmF1dGgifQ.433LZCeqtmJvLudOwZDKstqBhEZjK6kT9H0H08pMwsk",
		// };

		let payloads = {
			name: "HANY_GALAL_2024",
			mimeType: "application/vnd.google-apps.document",
		};

		// iGoogle_Code =
		// 	"4/0AbUR2VMo7wOI3N5x2hQQ0lnIQVzX84IYLu_ZZYn0m8_8kCX72VaHQRub6OjdG17d7jHaEA";

		var options = {
			contentType: "application/json",
			//contentType: "application/x-www-form-urlencoded",
			method: "post",
			//code: iGoogle_Code,
			//grant_type: "authorization_code",
			//redirect_uri: "http://localhost:3000/auth/google/callback",
			headers: headers, //,
			body: JSON.stringify(payloads), //here this is how you send your datas
			//payload: payloads, //,
			//"payload": '{"email": "shannon@gmail.com","password": "123321123"}'
		};

		var response = await fetch(
			"https://www.googleapis.com/drive/v3/files",
			options
		);
		res

			.setHeader("Content-Type", "application/json")

			.end(JSON.stringify(response));

		// // // // // console.log(
		// // // // // 	`response.ok ==  ${response.ok} , status ==  ${response.status}`
		// // // // // );

		// // // // // const xJSON = await response.json();

		// // // // // console.log("\n\nresponse-fetch-xJSON == " + xJSON);

		/*
		//{"error":{"code":401,"message":"Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.","errors":[{"message":"Invalid Credentials","domain":"global","reason":"authError","location":"Authorization","locationType":"header"}],"status":"UNAUTHENTICATED"}}
	  ERROR
		
		console.log("\n\nresponse-fetch-xJSON.code == " + xJSON.error.code);

		console.log("\n\nresponse-fetch-xJSON.messsage == " + xJSON.error.message);
		
		*/
		///////////////////////////////////

		//console.log("response-fetch-xJSON == " + xJSON.error_description);

		/////////////res.JSON(new JSON(`{messae:"true",doc_id= "1101"}`));

		////////////////////////////////////////////////
		////////////////////////////////////////////////res.end(JSON.stringify(xJSON));
		////////////////////////////////////////////////

		//	const xxx = await response.text();

		//	console.log("response-fetch == " + xxx);

		// if (!response.ok) {
		// 	throw new Error(`Error! status: ${response.status}`);
		// }

		// ✅ call response.json() here
		// const result = await response.json();

		// console.log("response-fetch-result == " + result);

		// console.log("response-fetch-result.error == " + result.error);

		//.then((response) => response.json())
		// .then((response) => {
		// 	//response();
		// 	console.log("response-fetch == " + response);
		// });
		// .then((data) => {
		// 	console.log("data == " + data);
		// });

		// 	.then((response) => {
		// 	response.json();
		// 	console.log("\n\n*** responseXXX == " + response.json());
		// }

		//);

		//const data = await response.json();

		//console.log(data);
		//  var response = UrlFetchApp.fetch("https://app.contenterp.com/api/contents/64107c5a77d642bc6c4a7be7", options);

		//const text = await response.text();
		//console.log(text);

		//console.log("\n\n*** response == " + response.text());

		// var jsonContent = JSON.parse(response);

		// console.log("\n\n*** jsonContent == " + jsonContent);

		// console.log("\n\n*** access_token == " + access_token);

		// const response = await fetch("http://example.com/movies.json");

		// const jsonData = await response.json();

		// console.log(jsonData);
	} catch (error) {
		console.log(error);
	}
}

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
