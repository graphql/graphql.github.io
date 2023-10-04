import React from "react"
import ButtonConf from "../Button"

const ThanksConf: React.FC = () => {
  return (
    <>
      {/*<div className="bg-gray-100 py-24">*/}
      {/*  <div className="container flex gap-20 flex-col">*/}
      {/*    <div className="flex gap-24 overflow-hidden">*/}
      {/*      <div className="w-1/3">*/}
      {/*        <h2 className="">Thank you for Attending!</h2>*/}
      {/*        <span>*/}
      {/*          Thank you to all who joined us for <b>GraphQLConf 2023</b>! We*/}
      {/*          look forward to seeing you at future events.To experience the*/}
      {/*          best of this year's event, be sure to watch session recordings*/}
      {/*          and slides from speakers, available on the event schedule for*/}
      {/*          each talk.*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*      <img*/}
      {/*        alt="gallery"*/}
      {/*        className="w-1/2 object-cover object-center"*/}
      {/*        src="/img/conf/Gallery/3.jpg"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div>hello</div>*/}
      {/*    <ButtonConf href="/conf/schedule/" className="!block mx-auto">*/}
      {/*      Explore recordings and slides*/}
      {/*    </ButtonConf>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <section className="text-gray-600 mt-8">
        <h1 className="text-center text-4xl text-white mb-10 font-bold">
          Thank you for Attending!
        </h1>
        <div className="container mx-auto flex md:flex-row flex-col items-center align-middle justify-center ">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              alt="gallery"
              className="w-full h-full rounded-full object-cover object-center block"
              src={`/img/conf/Gallery/7.jpg`}
            />
          </div>
          <div className="md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <p className="mb-8 leading-relaxed text-white font-medium">
              Thank you to all who joined us for <a>GraphQLConf 2023!</a> We
              look forward to seeing you at future events.
              <br />
              <br />
              To experience the best of this year's event, be sure to watch
              session recordings and slides from speakers, available on the
              event schedule for each talk.
            </p>
            <div className="flex justify-center">
              <ButtonConf
                className="inline-flex text-white border-0 py-2 px-6 focus:outline-none  rounded text-lg"
                href="/conf/schedule/"
              >
                Explore recordings and slides
              </ButtonConf>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ThanksConf
