import axios from "axios";
import FormData from "form-data";

const accessToken = "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";
const shopUrl = "https://gaaravu130.myshopify.com/admin/api/2024-10";
const mimeType = "image/jpeg"; // Adjust based on the image type

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function shopifyUploadBase64Image(imageBase64, fileName) {
    if (!imageBase64.startsWith("data:image/")) {
        return {
            url: imageBase64
        };
    }
    try {
        // Step 1: Request staged upload target
        const stagedUploadsQuery = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            resourceUrl
            url
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

        const stagedUploadsVariables = {
            input: [
                {
                    filename: fileName,
                    httpMethod: "POST",
                    mimeType: mimeType,
                    resource: "FILE",
                },
            ],
        };
        const stagedResponse = await axios.post(
            `${shopUrl}/graphql.json`,
            {
                query: stagedUploadsQuery,
                variables: stagedUploadsVariables,
            },
            {
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                },
            }
        );
        const stagedTarget =
            stagedResponse.data.data.stagedUploadsCreate.stagedTargets[0];
        const params = stagedTarget.parameters;
        const uploadUrl = stagedTarget.url;
        const resourceUrl = stagedTarget.resourceUrl;
        // Step 2: Convert Base64 to Buffer and upload to AWS S3
        const fileBuffer = Buffer.from(imageBase64, "base64");
        const form = new FormData();

        params.forEach(({ name, value }) => {
            form.append(name, value);
        });
        form.append("file", fileBuffer, {
            filename: fileName,
            contentType: mimeType,
        });
        await axios.post(uploadUrl, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        // console.log("File uploaded to staged location.");

        // Step 3: Register file with Shopify
        const createFileQuery = `
            mutation fileCreate($files: [FileCreateInput!]!) {
                fileCreate(files: $files) {
                files {
                    alt
                    id
                    fileStatus
                }
                userErrors {
                    field
                    message
                }
                }
            }
        `;

        const createFileVariables = {
            files: [
                {
                    alt: "Image alt text",
                    contentType: "IMAGE",
                    originalSource: resourceUrl,
                },
            ],
        };
        const createFileResponse = await axios.post(
            `${shopUrl}/graphql.json`,
            {
                query: createFileQuery,
                variables: createFileVariables,
            },
            {
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                },
            }
        );

        const fileData = createFileResponse?.data?.data?.fileCreate?.files[0];
        if (!fileData) {
            throw new Error("File registration failed: No file data returned.");
        }
        // console.log("File registered in Shopify. File:", fileData);
        // Step 4: (Optional) Fetch file metadata, including URL
        const fileMetadataQuery = `
            query {
                node(id: "${fileData.id}") {
                id
                ... on MediaImage {
                    status
                    originalSource{
                        url
                    }
                    image {
                    url
                    }
                }
                }
            }
        `;

        let imageUrl = "";
        // QUERY URL ẢNH NHƯNG KHÔNG BIẾT KHI NÀO ẢNH UPLOADED
        do {
            await sleep(2000);
            const fileMetadataResponse = await axios.post(
                `${shopUrl}/graphql.json`,
                {
                    query: fileMetadataQuery,
                    // variables: { id: fileData.id },
                },
                {
                    headers: {
                        "X-Shopify-Access-Token": accessToken,
                    },
                }
            );
            console.log("Uploaded image URL:", fileMetadataResponse.data.data);
            imageUrl = fileMetadataResponse?.data?.data?.node?.image?.url || "";
            console.log("imageUrl4343", imageUrl);
        } while (!imageUrl);
        return imageUrl;

    } catch (error) {
        console.error("Error during upload process:", error.response?.data || error);
    }
}

const shopifyUploadMultipleBase64Images = async (imageList, courtName) => {
    const imageUrls = [];

    for (const image of imageList) {
        const imageUrl = await shopifyUploadBase64Image(image.url, courtName);
        imageUrls.push({
            url: imageUrl,
            alt: image.alt
        });
    }
    console.log("imageUrls434", imageUrls);
    return imageUrls;
};


export {
    shopifyUploadBase64Image,
    shopifyUploadMultipleBase64Images
};