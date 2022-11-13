import React, { useState } from "react"
import type { PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

export default ({ pageContext }: PageProps<{}, { sourcePath: string }>) => {
  return (
    <Layout pageContext={pageContext} className="brand">
      <section>
        <h1>GraphQL Logo &amp; Brand Guidelines</h1>
        <div className="agree-actions-container top">
          <AgreeActions />
        </div>
        <p>
          Here you’ll find dos and don’ts for use of the GraphQL brand and
          GraphQL logo files in supported arrangement and colors.
        </p>
        <p>
          “GraphQL” is a trademark managed by the{" "}
          <a href="/foundation" target="_blank">
            GraphQL Foundation
          </a>
          . Use of the trademark and logo are subject to the{" "}
          <a
            href="https://lfprojects.org/policies/trademark-policy/"
            target="_blank"
          >
            LF Projects trademark policy
          </a>
          .
        </p>
        <p>
          Certain fair use of the GraphQL mark are pre-approved, such as factual
          references to the project. Others require permission first, such as
          apparel for sale or any other commercial purpose, using the word
          GraphQL in domain names, or using the mark on printed materials, to
          name a few. You can find a more comprehensive list in the trademark
          policy.
        </p>
        <p>
          Please email{" "}
          <a href="mailto:info@graphql.org?subject=Trademark%20Request">
            info@graphql.org
          </a>{" "}
          with any questions or requests.
        </p>
      </section>
      <section>
        <h2>The GraphQL&trade; trademark</h2>
        <p>
          The word "GraphQL" may only be used to refer to the GraphQL project
          and technologies which conform to the{" "}
          <a href="https://spec.graphql.org" target="_blank">
            GraphQL specification
          </a>
          .
        </p>
        <div className="dos-donts">
          <ul className="do">
            <li>
              <em>Do</em> keep the “GraphQL” word consistent, with the first
              letter and QL capitalized.
            </li>
            <li>
              <em>Do</em> use "GraphQL" to clearly describe the GraphQL project
              or a conforming technology.
              <ul>
                <li>GraphQL for Go</li>
                <li>Quick Start to GraphQL by &lt;company&gt;</li>
              </ul>
            </li>
            <li>
              <em>Do</em> provide clear attribution for projects, services and
              events, balancing "GraphQL" with your own brand.
              <ul>
                <li>&lt;service&gt; for GraphQL by &lt;company&gt;</li>
                <li>Seattle GraphQL Meetup hosted by &lt;company&gt;</li>
              </ul>
            </li>
          </ul>
          <ul className="dont">
            <li>
              <em>Don't</em> lowercase or abbreviate “GraphQL” (for example
              "Graphql" or “GQL”).
            </li>
            <li>
              <em>Don't</em> directly combine “GraphQL” with another trademark
              or generic term.
              <ul>
                <li>Go GraphQL</li>
                <li>GraphQL Quick Start by &lt;company&gt;</li>
              </ul>
            </li>
            <li>
              <em>Don't</em> use “GraphQL” in a way that could imply
              partnership, sponsorship, or endorsement by the GraphQL project or
              GraphQL Foundation either directly or by omission.
            </li>
            <li>
              <em>Don't</em> use the GraphQL brand disparagingly or in any other
              way that violates our{" "}
              <a href="/codeofconduct" target="_blank">
                code of conduct
              </a>
              .
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Color &amp; Typeface</h2>
        <p>Our core color is called Rhodamine.</p>
        <p>The GraphQL wordmark and headlines are set in Rubik Light.</p>
        <div className="samples">
          <div className="rhodamine-sample">
            Rhodamine
            <dl>
              <dt>P3</dt>
              <dd>0.8824, 0, 0.5961</dd>
              <dt>RGB</dt>
              <dd>225, 0, 152 / #E10098</dd>
              <dt>PMS</dt>
              <dd>
                <a
                  href="https://www.pantone.com/color-finder/Rhodamine-Red-C"
                  target="_blank"
                >
                  Rhodamine Red C
                </a>
              </dd>
              <dt>CMYK</dt>
              <dd>5, 92, 0, 0</dd>
            </dl>
          </div>
          <div className="rubik-sample">
            <a
              href="https://fonts.google.com/specimen/Rubik?sidebar.open=true&selection.family=Rubik:wght@300&preview.text=GraphQL&preview.text_type=custom"
              target="_blank"
            >
              Rubik Light
            </a>
            <dl>
              <dt>Weight</dt>
              <dd>300</dd>
              <dt>License</dt>
              <dd>
                <a
                  href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
                  target="_blank"
                >
                  Open Font License
                </a>
              </dd>
            </dl>
            <div className="sample">GraphQL &Aring;BC&oslash;rm123</div>
          </div>
        </div>
        <div className="dos-donts">
          <ul className="do">
            <li>
              <em>Do</em> use Rhodamine alongside grayscale or
              neutral&nbsp;colors.
            </li>
            <li>
              <em>Do</em> prefer the P3 wide gamut color over RGB in digital;
              the PMS spot color over CMYK process in&nbsp;print.
            </li>
            <li>
              <em>Do</em> use Rubik Light with optical kerning and standard
              letter&nbsp;spacing.
            </li>
          </ul>
          <ul className="dont">
            <li>
              <em>Don't</em> use Rhodamine for large background&nbsp;areas.
            </li>
            <li>
              <em>Don't</em> directly combine Rhodamine with other bright or
              saturated&nbsp;colors.
            </li>
            <li>
              <em>Don't</em> bold, italicize, or alter the letter spacing of
              the&nbsp;GraphQL&nbsp;wordmark.
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>GraphQL Logo &amp; Hexagraph</h2>
        <p>
          Our logomark is called the "hexagraph". The GraphQL logo is composed
          of the hexagraph and the GraphQL wordmark set in Rubik Light.
        </p>
        <div className="logoGrid" style={{ gap: "1.5%", flexWrap: "wrap" }}>
          <div className="square" style={{ width: "27%", minWidth: "160px" }}>
            <div style={{ padding: "25%" }}>
              <img
                style={{ minWidth: "50px" }}
                src="/img/brand/logos/logo.svg"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexBasis: "480px",
              padding: "4.5%",
              flex: 1,
              gap: "8%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
                flex: 6,
                gap: "25%",
              }}
            >
              <img
                style={{ minWidth: "75px", minHeight: "20px" }}
                src="/img/brand/logos/logo-wordmark.svg"
              />
              <img
                style={{ minWidth: "75px", minHeight: "20px" }}
                src="/img/brand/logos/logo-foundation-wordmark.svg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                flex: 7,
                gap: "15%",
              }}
            >
              <img
                style={{ minWidth: "50px", flex: 1 }}
                src="/img/brand/logos/logo-stacked.svg"
              />
              <img
                style={{ minWidth: "50px", flex: 1 }}
                src="/img/brand/logos/logo-foundation-stacked.svg"
              />
            </div>
          </div>
        </div>
        <div className="dos-donts">
          <ul className="do">
            <li>
              <em>Do</em> prefer the horizontal logo, but use the stacked logo
              at larger&nbsp;sizes.
            </li>
            <li>
              <em>Do</em> use the provided assets, don't redraw
              the&nbsp;hexgraph.
            </li>
          </ul>
        </div>
        <div className="dos-donts">
          <ul className="dont img-examples">
            <li>
              <div>
                <em>Don't</em> rotate or stretch the hexagraph. Position the
                inner triangle pointing&nbsp;upwards.
              </div>
              <img src="/img/brand/logo-dont/dont-rotate.svg" />
              <img src="/img/brand/logo-dont/dont-stretch.svg" />
            </li>
            <li>
              <div>
                <em>Don't</em> remove or add any elements within the hexagraph,
                or combine with another&nbsp;logo.
              </div>
              <img src="/img/brand/logo-dont/dont-remove.svg" />
              <img src="/img/brand/logo-dont/dont-add.svg" />
            </li>
            <li>
              <div>
                <em>Don't</em> decorate or add effects to any part of
                the&nbsp;logo.
              </div>
              <img src="/img/brand/logo-dont/dont-decorate.svg" />
              <div className="dont-effect">
                <img src="/img/brand/logo-dont/dont-effect.svg" />
              </div>
            </li>
            <li>
              <div>
                <em>Don't</em> resize or reposition elements of the hexagraph.
              </div>
              <img src="/img/brand/logo-dont/dont-resize-1.svg" />
              <img src="/img/brand/logo-dont/dont-resize-2.svg" />
            </li>
            <li>
              <div>
                <em>Don't</em> resize or reposition the wordmark relative to the
                hexagraph.
              </div>
              <img src="/img/brand/logo-dont/dont-resize-wordmark.svg" />
            </li>
            <li>
              <div>
                <em>Don't</em> change the typeface of the wordmark.
              </div>
              <img src="/img/brand/logo-dont/dont-change-typeface.svg" />
            </li>
          </ul>
        </div>
        <h3>Spacing</h3>
        <p>
          Give the logo some space to breathe. Keep a clear space of at least
          half the height of the hexagraph along on all sides.
        </p>
        <div className="logoGrid" style={{ gap: "37px" }}>
          <img
            style={{ maxHeight: "150px" }}
            src="/img/brand/logos/logo-space.svg"
          />
          <img
            style={{ maxHeight: "150px" }}
            src="/img/brand/logos/logo-wordmark-space.svg"
          />
        </div>
        <h3>Color use</h3>
        <p>
          The GraphQL logo should appear in Rhodamine, white, or black. It may
          appear on any color background with the appropriate logo color.
        </p>
        <div className="color-combos">
          <img src="/img/logo.svg" style={{ background: "white" }} />
          <img src="/img/logo.svg" style={{ background: "#d0d3da" }} />
          <img src="/img/logo.svg" style={{ background: "black" }} />
          <img
            src="/img/brand/logos/logo-white.svg"
            style={{ background: "var(--rhodamine)" }}
          />
          <img
            src="/img/brand/logos/logo-white.svg"
            style={{ background: "black" }}
          />
          <img
            src="/img/brand/logos/logo-white.svg"
            style={{ background: "#00f0ff" }}
          />
          <img
            src="/img/brand/logos/logo-black.svg"
            style={{ background: "white" }}
          />
        </div>
        <div className="dos-donts">
          <ul className="do">
            <li>
              <em>Do</em> prefer Rhodamine on a white background, our default
              color combination.
            </li>
            <li>
              <em>Do</em> otherwise prefer use the white logo on most
              backgrounds unless contrast requires use of black.
            </li>
          </ul>
        </div>
        <div className="color-combos">
          <img
            src="/img/brand/logos/logo-black.svg"
            style={{ background: "var(--rhodamine)" }}
          />
          <img src="/img/logo.svg" style={{ background: "#00f0ff" }} />
          <img
            src="/img/logo.svg"
            style={{
              background:
                "url(/img/brand/logo-dont/dont-complex-background.jpg)",
              backgroundSize: "cover",
            }}
          />
          <img
            src="/img/brand/logo-dont/dont-color.svg"
            style={{ background: "white" }}
          />
          <img
            className="filter"
            src="/img/brand/logo-dont/dont-gradient.svg"
            style={{ background: "white" }}
          />
          <img
            src="/img/brand/logo-dont/dont-color-wordmark.svg"
            style={{ background: "white" }}
          />
        </div>
        <div className="dos-donts">
          <ul className="dont">
            <li>
              <em>Don't</em> use black on a background of Rhodamine.
            </li>
            <li>
              <em>Don't</em> use Rhodamine on a color or patterned background;
              use white instead.
            </li>
            <li>
              <em>Don't</em> use different colors or apply gradients to the
              logo.
            </li>
            <li>
              <em>Don't</em> use different colors for elements of the logo.
              Always use the same color for the hexagraph and wordmark.
            </li>
          </ul>
        </div>
      </section>
      <section className="agree-actions-container bottom">
        <AgreeActions />
      </section>
    </Layout>
  )
}

export function Head() {
  return <Seo title="GraphQL logo, brand guidelines and assets" />
}

function AgreeActions() {
  const [agree, setAgree] = useState(false)
  return (
    <div className="agree-actions">
      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={event => setAgree(event.target.checked)}
        ></input>
        I have read and accept the brand and trademark guidelines.
      </label>
      <a
        {...(!agree
          ? { className: "disabled" }
          : { href: "/img/brand/graphql-brand-assets.zip" })}
      >
        Download Logo Files
      </a>
      <a
        {...(!agree
          ? { className: "disabled" }
          : { href: "mailto:info@graphql.org?subject=Trademark%20Request" })}
      >
        Request Permission
      </a>
    </div>
  )
}
