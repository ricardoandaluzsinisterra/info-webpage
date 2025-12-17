import cloudinaryPkg from 'cloudinary'

const cloudinary = (cloudinaryPkg as any).v2 || (cloudinaryPkg as any)

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY as string | undefined
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET as string | undefined

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

export async function uploadImage(filePath: string, folder = 'latam-democratical'): Promise<unknown> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
      width: 800,
      height: 600,
      crop: 'fill',
      quality: 'auto'
    })
    return result as unknown
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

export function getOptimizedUrl(publicId: string, width = 800, height = 600): string {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  })
}
