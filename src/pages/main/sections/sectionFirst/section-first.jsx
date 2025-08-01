import React from 'react';

import sectionFirstCss from "./section-firstCss.module.scss"

import FindBrand from "../../../../components/findBrand/findBrand";

const SectionFirst = () => {
    return <section className={sectionFirstCss.marginTop}>
        <FindBrand/>
    </section>
}


export default SectionFirst;
