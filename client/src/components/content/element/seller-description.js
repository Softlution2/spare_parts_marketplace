import React, { Component, Fragment } from 'react';

export class SellerDescription extends Component {

    render() {
        const {description} = this.props;
        return (
            <Fragment>
                <div className="atbd_content_module">
                    <div className="atbd_content_module__tittle_area">
                        <div className="atbd_area_title">
                            <h4><span className="la la-list-alt"></span>Seller Description</h4>
                        </div>
                    </div>
                    <div className="atbdb_content_module_contents">
                        <p>{description}</p>
                        {/* <ul className="atbd_custom_fields features-table">
                            <li>
                                <div className="atbd_custom_field_title">
                                    <p>Burn Unit: </p>
                                </div>
                                <div className="atbd_custom_field_content">
                                    <p>Quam kaddui posuere</p>
                                </div>
                            </li>
                            <li>
                                <div className="atbd_custom_field_title">
                                    <p>Custom Select Option:</p>
                                </div>
                                <div className="atbd_custom_field_content">
                                    <p>Curabitur aliquet quam id dui posuere blandit.</p>
                                </div>
                            </li>
                            <li>
                                <div className="atbd_custom_field_title">
                                    <p>Custom Textarea:</p>
                                </div>
                                <div className="atbd_custom_field_content">
                                    <p>Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia is Curae; Donec velit neque, auctor sit amet aliquam.</p>
                                </div>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </Fragment>
        )
    }
}