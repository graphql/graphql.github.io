import React from "react"

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
    src: "https://events.linuxfoundation.org/wp-content/uploads/2022/12/San-Francisco-Pier39-unsplash.jpg",
    name: "Pier 39",
    description:
      "Pier 39 is a shopping center and popular tourist attraction built on a pier in San Francisco, California. At Pier 39, there are shops, restaurants, a video arcade, street performances, the Aquarium of the Bay, virtual 3D rides, and views of California sea lions hauled out on docks on Pier 39’s marina.",
    link: "https://www.pier39.com/",
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
    <div className="bg-white">
      <h1 className="text-4xl text-center mb-5 title-font text-[#862e69] font-bold">
        About San Francisco
      </h1>
      <div className="flex flex-wrap w-full justify-center">
        {images.map((image, i) => (
          <div key={i} className="lg:w-1/4 sm:w-full mx-5 mb-5">
            <a
              href={image.link}
              className="flex relative no-underline hover:no-underline"
            >
              <img
                alt={image.name}
                className="absolute inset-0 w-full h-36 object-cover object-center rounded-md"
                src={image.src}
              />
              <div className=" relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 no-underline hover:no-underline">
                <h2 className="tracking-widest text-base title-font font-bold text-[#862e69] no-underline hover:no-underline">
                  {image.name}
                </h2>
                <p className="leading-relaxed no-underline hover:no-underline text-black">
                  {image.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SFConf
