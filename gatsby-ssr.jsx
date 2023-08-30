const React = require("react");
const SeoConf = require("./src/components/Conf/Seo/index.tsx").default;


exports.wrapPageElement = ({ element, props }) => {
  // Get search params from location object
  const searchParams = getSearchParams(props.location.hash);

  const ogImageUrl = `https://og-image.the-guild.dev/conf${searchParams}`;

  return (
    <>
      <Helmet>
         <SeoConf
          title="My ticket"
          ogImage={{
            url: ogImageUrl,
            width: 1200,
            height: 630,
          }}
        />

        <meta
          property="og:url"
          content={`https://graphql.org${props.location.pathname}`}
        />
      </Helmet>
      {element}
    </>
  );
};


function getSearchParams(base64) {
  let string
  try {
    string = atob(base64)
  } catch (error) {
    console.log(error)
    return ""
  }

  let list = []

  try {
    list = JSON.parse(string)
  } catch (error) {
    console.log(error)
    return ""
  }

  const [fullName, jobTitle, company, github] = list
  const searchParams = new URLSearchParams({
    ...(fullName && { fullName }),
    ...(jobTitle && { jobTitle }),
    ...(company && { company }),
    ...(github && { github }),
  })
  return "?" + searchParams.toString()
}
