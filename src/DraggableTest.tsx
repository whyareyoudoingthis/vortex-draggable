import { IMod, IState } from "vortex-api/lib/types/api";
import { ComponentEx, MainPage, FlexLayout, selectors, log, DraggableList } from "vortex-api";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Panel, ListGroupItem } from "react-bootstrap";
import { getModName } from "vortex-ext-common";
import React from 'react';


interface IConnectedProps {
    installed: { [modId: string]: IMod};
}

type IProps = IConnectedProps;

class PageHeadingView extends ComponentEx<IProps, {}> {

    public render() {
        const { installed } = this.props;
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

class ModItemRenderer extends ComponentEx<{item: IMod}, {}> {
    render() {
        const { item } = this.props;
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