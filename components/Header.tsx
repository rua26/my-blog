import { Fragment, useEffect, useState } from 'react';

import Head from 'next/head';

// Languages
import { i18n, useTranslation } from '@languages/i18n';
import { Router } from 'next-i18next';

// Components
import Dropdown from './client/Dropdown';
import Button from './client/Button';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@redux/actions';
import { ReduxStates } from '@redux/reducers';

/**
 * Header
 * @author: Le Thang
 */
interface Props {
    pageLoading: boolean;
    router: Router;
}
interface IComponentHeader<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Header: IComponentHeader<Props> = (props) => {
    // Constructor
    const locale = useSelector((states: ReduxStates) => states.locale);
    const { t } = useTranslation(['title']);
    const dispatch = useDispatch();
    const [state, setState] = useState(() => {
        return {
            menu_1: [
                {
                    title: 'Wallet',
                },
                {
                    title: 'Cards',
                },
                {
                    title: 'Bank transfers',
                },
                {
                    title: 'Shopping',
                },
            ],
            languages: [
                {
                    code: 'en',
                    title: 'English',
                    is_default: 1,
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                    is_default: 0,
                },
            ],
        };
    });

    // useEffect as componentDidMount
    useEffect(() => {
        setLanguage(i18n.language);
    }, []);

    const setLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        dispatch(actions.setLocale(locale));
    };

    return (
        <Fragment>
            <Head>
                <title>Robomine</title>
                <link href="/library-asset/css/toastr.min.css" rel="stylesheet" />
                <link href="/library-asset/css/tachyons.min.css" rel="stylesheet" />
                <link href="/client-asset/css/main.css" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            {!props.pageLoading ? (
                <div className="components__header white">
                    <div className="flex justify-between items-center">
                        <div>Logo Here</div>
                        <div className="bases__text--bold bases__p--cursor flex items-center">
                            <Dropdown id={'menu_1_dropdown'} items={state.menu_1} itemIndex={'title'} onClickItem={(item: any) => {}}>
                                <div className="mr4 ml2 drop-trigger">Menu 1</div>
                            </Dropdown>
                            <div className="mr4 ml2">Menu 2</div>
                            <div className="mr4 ml2">Menu 3</div>
                            <div className="mr5 ml2">Menu 4</div>
                            <div className="ml2">
                                <Button className="mr1">
                                    <i className="" />
                                    Web Wallet
                                </Button>
                                <Button>Get the App</Button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bases__font--22 ph3-l">
                        <Dropdown
                            id={'multilang-dropdown'}
                            items={state.languages}
                            itemIndex={'title'}
                            onClickItem={(item: any) => setLanguage(item.code)}>
                            {locale}
                        </Dropdown>
                    </div> */}
                </div>
            ) : (
                ''
            )}
        </Fragment>
    );
};

Header.getInitialProps = async () => {
    return {
        namespacesRequired: ['title'],
    };
};

export default Header;
