import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as QRCode from 'qrcode';
import * as sharp from 'sharp';

@Injectable()
export class AppService {
  async serveImage(res: Response): Promise<Response> {
    // Use the image stored on the server.
    const originalImagePath = path.join(__dirname, '..', 'assets', 'image.jpg');

    // Data to be encoded in the QR code. It should be replaced with the link including the URA document.
    const uraLink = 'https://bc-labs.net/';

    // Generate QR code as PNG buffer with reduced margin
    const qrBuffer = await QRCode.toBuffer(uraLink, { margin: 1 }); // You can adjust the margin as per your requirement

    // Use sharp to overlay the QR code onto the original image and get the result as a buffer
    const outputBuffer = await sharp(originalImagePath)
      .composite([{ input: qrBuffer, gravity: 'southeast' }]) // overlay QR on the bottom right (southeast)
      .toBuffer();

    // Serve the synthesized image directly without saving to local storage
    res.setHeader('Content-Type', 'image/jpeg');

    return res.send(outputBuffer);
  }
}
