import React from 'react';
import {Image} from 'antd';

import searchResultItemCss from "./searchResultItemCss.module.scss"

const SearchResultItem = ({articleNumber, brand, room, row, description, photo, altPhoto, line, name}) => {
    return <tr className={searchResultItemCss.item}>
        <td>{articleNumber}</td>
        <td>{brand}</td>
        <td>{room}</td>
        <td>{row}</td>
        <td>{description}</td>
        <td>
            <Image src={photo} alt={altPhoto}/>
        </td>
        <td>{line}</td>
        <td>{name}</td>
    </tr>
}

export default SearchResultItem;
