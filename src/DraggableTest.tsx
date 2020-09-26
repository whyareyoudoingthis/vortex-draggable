import { IMod, IExtensionApi, IState, IProfile, IProfileMod } from "vortex-api/lib/types/api";
import { ComponentEx, util, MainPage, FlexLayout, selectors, Icon, log, DraggableList } from "vortex-api";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Panel, ListGroup, ListGroupItem, Button, Image, Checkbox, CheckboxProps } from "react-bootstrap";
import { getModName } from "vortex-ext-common";
import React, { Component } from 'react';


interface IConnectedProps {
    installed: { [modId: string]: IMod};
}

interface IPanelState {
    
}

type IProps = IConnectedProps;

class PageHeadingView extends ComponentEx<IProps, {}> {
    // mainPage: React.Component<{}, any, any> = null;
    // header: React.Component<{}, any, any> = null;

    public render() {
        const { installed } = this.props;
        let modIds = Object.keys(installed);
        let mods = Object.keys(installed).map(i => installed[i]);
        return (
            <MainPage>
                <MainPage.Body>
                        <Panel id="test-page-heading">
                            <Panel.Body>
                                <FlexLayout type="row">
                                <DraggableList 
                                    id='draggable-test'
                                    itemTypeId='draggable-test-item'
                                    items={mods}
                                    itemRenderer={ModItemRenderer}
                                    apply={this.applyItem.bind(this)}
                                    className='nemesis-table'
                                />
                                </FlexLayout>
                            </Panel.Body>
                        </Panel>
                </MainPage.Body>
            </MainPage>
        )
    }

    applyItem(order: IMod[]): void {
        log('debug', 'item apply called', {mods: order.length});
    }
}

class ModItemRenderer extends ComponentEx<{item: IMod, className: string}, {}> {
    render() {
        const { item, className } = this.props;
        return (
            <ListGroupItem key={item.id}>
                <>{getModName(item)}</>
            </ListGroupItem>
        );
    }
}

function mapStateToProps(state: IState): IConnectedProps {
    return {
        installed: state.persistent.mods[selectors.activeGameId(state)]
    }
}

export default withTranslation(['common'])(connect(mapStateToProps)(PageHeadingView));