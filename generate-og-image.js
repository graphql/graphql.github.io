const { createCanvas, loadImage } = require("canvas")
const fs = require("fs")
const path = require("path")

// fetch speakers data
const speakers = require("./speakers")

async function generateImages() {
  await Promise.all(
    speakers.map(async speaker => {
      if (!speaker.avatar) return
      console.log(speaker.avatar)

      const canvas = createCanvas(1200, 630)
      const ctx = canvas.getContext("2d")

      // Load the background image
      const background = await loadImage(
        path.resolve(__dirname, "static/img/conf/social-pk.jpg")
      )

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      // Fetch speaker avatar
      const avatarUrl = speaker.avatar.startsWith("http")
        ? speaker.avatar
        : "https:" + speaker.avatar
      const response = await fetch(avatarUrl)

      // Create a buffer from the fetched data
      const buffer = await response.arrayBuffer()
      const avatarBuffer = Buffer.from(buffer)

      // Load speaker avatar
      const avatar = await loadImage(avatarBuffer)

      // Calculate the position for the avatar image
      const avatarX = canvas.width / 2 - avatar.width / 2
      const avatarY = 50 // Adjust according to your needs

      ctx.drawImage(avatar, avatarX, avatarY)

      // Add speaker name
      ctx.fillStyle = "#000" // Adjust text color as per your needs
      ctx.font = "bold 60px Arial"
      ctx.fillText(speaker.name, 20, 400) // Adjust position as per your needs

      // Add speaker title and company
      ctx.font = "bold 40px Arial"
      ctx.fillText(`${speaker.position} at ${speaker.company}`, 20, 450) // Adjust position as per your needs

      // Write the image to a file
      const outputBuffer = canvas.toBuffer("image/png")
      fs.writeFileSync(
        `static/img/conf/speakers/og-images/${speaker.username}.png`,
        outputBuffer
      )
    })
  )
}

generateImages()
