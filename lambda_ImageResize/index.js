import AWS from 'aws-sdk';
import sharp from 'sharp';

const S3 = new AWS.S3();

export const handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  try {
    // 원본 이미지 가져오기
    const originalImage = await S3.getObject({ Bucket: bucket, Key: key }).promise();
    const imageBuffer = originalImage.Body;

    // 메타데이터를 통해 확장자 및 크기 확인
    const metadata = await sharp(imageBuffer).metadata();
    const format = key.split('.').pop().toLowerCase(); // 확장자 추출

    // 이미지 크기 확인
    if (metadata.width < 1080 && metadata.height < 1080) {
      console.log(`image size is ${metadata.width}x${metadata.height}`);
      return {
        statusCode: 200,
        body: `image size is ${metadata.width}x${metadata.height}, no resize needed.`
      };
    }

    // 이미지 리사이즈 (비율 유지)
    const resizedImage = await sharp(imageBuffer)
      .resize(1080, 1080, { fit: 'inside' }) // 비율 유지하면서 리사이즈
      .toFormat(metadata.format) // 원본 포맷 유지
      .toBuffer();

    // 리사이즈된 이미지 덮어쓰기 저장
    await S3.putObject({
      Bucket: bucket,
      Key: key, // 원본 경로에 덮어쓰기
      Body: resizedImage,
      ContentType: `image/${metadata.format}`, // 원본 이미지 포맷에 맞게 설정
    }).promise();

    return { statusCode: 200, body: 'Image resized and overwritten successfully' };

  } catch (error) {
    console.error('Image resize failed:', error);
    return {
      statusCode: 500,
      body: `Image resize failed: ${error.message}`
    };
  }
};