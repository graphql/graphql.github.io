import React from "react"
import { AspectRatio } from '../../aspect-ratio'

interface Image {
  src: string
  name: string
  description: string
  link: string
}
const images: Image[] = [
  {
    src: "https://events.linuxfoundation.org/wp-content/uploads/2022/12/San-Francisco-Golden-Gate-Bridge-unsplash.jpg",
    name: "Golden Gate Bridge",
    description:
      "Each year the Golden Gate Bridge attracts more than 10 million visitors to take in its tremendous 746-foot tall towers, sweeping main cables, signature International Orange color and Art Deco styling. It is a sensory experience featuring color, light and sound.",
    link: "https://www.goldengate.org/",
  },
  {
    src: "https://events.linuxfoundation.org/wp-content/uploads/2022/12/San-Francisco-North-Beach-unsplash.jpg",
    name: "North Beach San Francisco",
    description:
      "North Beach, a buzzy neighborhood steeped in Italian heritage, draws locals and tourists to its checked-tablecloth trattorias, coffee shops and retro-flavored bars.",
    link: "https://www.sftravel.com/neighborhoods/north-beach",
  },
  {
    src: "https://events.linuxfoundation.org/wp-content/uploads/2022/12/San-Francisco-Alcatraz-unsplash.jpg",
    name: "Alcatraz",
    description:
      "Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary.",
    link: "https://www.nps.gov/alca/index.htm",
  },
  {
    src: "https://events.linuxfoundation.org/wp-content/uploads/2022/12/San-Francisco-Fishermans-Wharf-unsplash.jpg",
    name: "Fisherman’s Wharf",
    description:
      "Fisherman’s Wharf, on the northern waterfront, is one of the city’s busiest tourist areas. Souvenir shops and stalls selling crab and clam chowder in sourdough bread bowls appear at every turn, as do postcard views of the bay, Golden Gate and Alcatraz. There’s also a colony of sea lions to see and historic ships to tour. At Ghirardelli Square, boutiques and eateries reside in the famed former chocolate factory.",
    link: "https://www.fishermanswharf.org/",
  },
]
const SFConf = () => {
  return (
    <div className="bg-white pb-10 pt-8">
      <h1 className="text-4xl text-center mb-5 text-[#0E031C] font-bold pb-6">
        About San Francisco
      </h1>
      <div className="flex flex-wrap w-full justify-center">
        {images.map((image, i) => (
          <div key={i} className="lg:w-1/5 sm:w-full mx-5 mb-5">
            <div className="max-w-sm">
              <AspectRatio title={image.name} src={image.src} href={image.link} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SFConf
