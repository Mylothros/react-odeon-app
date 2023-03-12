import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Tabs.scss';

const Tabs = (props) => {
    const { children } = props;
    const [activeTab, setActiveTab] = useState(children[0].props.label);
    
    let className='';

    const onClickTabItem = (label) => {
        setActiveTab(label);
    };

    return (
        <div className="tabs">
            <ol className="tab-list">
                {
                    children.map((child) => {
                       const { label } = child.props;   
                       activeTab !== label ? className='tab-list-item' : className='tab-list-item tab-list-active'                            
                       return (
                                <li key={label} className={className} onClick={() => onClickTabItem(label)}>
                                    {label}
                                </li>
                                )
                    })
                }
            </ol>
            <div className="tab-content">
                {
                    children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                            return child.props.children;
                    })
                }
            </div>
        </div>
    )
}

Tabs.propTypes= {
    children: PropTypes.array.isRequired
};

export default Tabs;