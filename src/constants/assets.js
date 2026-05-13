const ASSET_BASE = '/asset'

const assetPath = (fileName) => `${ASSET_BASE}/${fileName}`

export const ASSETS = {
  logo: assetPath('logo.png'),
  favicon: assetPath('logo2.png'),
  motionPage: assetPath('Motion%20Page.mp4'),
  heroImage: assetPath('filmmaker.jpeg'),
  filmmaker: assetPath('filmmaker.jpeg'),
  throughOurLens: assetPath('Through%20Our%20Lens%20.jpg'),
  monokrom: assetPath('Monokrom.png'),
  lovebirds: assetPath('Lovebirds%20.jpg'),
  miro: assetPath('Mirooooooooo.png'),
  aiLove: assetPath('Ai%E6%84%9B.png'),
  event: assetPath('event.jpeg'),
  eventAlt: assetPath('event1.jpeg'),
}
