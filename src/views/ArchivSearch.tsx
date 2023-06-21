import AskForData from "@/components/AskForData";
import { Suspense } from "react";

const ArchivSearch = () => {
  return (
    <div className="row expanded">
      <div className="region region--content">
        <div id="block-gu-ruby-content" className="u-max-width-full">
          <article className="node node--landing-page">
            <div className="banner u-optional-bg-2">
              <div className="banner__inner">
                <div className="banner__title">
                  <h1 className="heading-condensed u-inherit-color u-mb-150">
                    Arkivsök
                  </h1>
                </div>
              </div>
            </div>
            <Suspense fallback={<h3>Loading...</h3>}>
              <AskForData />
            </Suspense>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArchivSearch;
