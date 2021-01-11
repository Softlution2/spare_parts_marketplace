import React, { Component, Fragment } from 'react';

export class SectionTitle extends Component {

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <div className="line"></div>
                            <h2>{this.props.title}</h2>
                            <p>{this.props.content}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}