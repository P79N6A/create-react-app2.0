import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Spin from '../spin';
import Pagination from '../pagination';
import { Row } from '../grid';
import Item from './Item';

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List() {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));

        _this.state = {
            paginationCurrent: 1
        };
        _this.defaultPaginationProps = {
            current: 1,
            pageSize: 10,
            onChange: function onChange(page, pageSize) {
                var pagination = _this.props.pagination;

                _this.setState({
                    paginationCurrent: page
                });
                if (pagination && pagination.onChange) {
                    pagination.onChange(page, pageSize);
                }
            },
            total: 0
        };
        _this.keys = {};
        _this.renderItem = function (item, index) {
            var _this$props = _this.props,
                dataSource = _this$props.dataSource,
                renderItem = _this$props.renderItem,
                rowKey = _this$props.rowKey;

            var key = void 0;
            if (typeof rowKey === 'function') {
                key = rowKey(dataSource[index]);
            } else if (typeof rowKey === 'string') {
                key = dataSource[rowKey];
            } else {
                key = dataSource.key;
            }
            if (!key) {
                key = 'list-item-' + index;
            }
            _this.keys[index] = key;
            return renderItem(item, index);
        };
        _this.renderEmpty = function (contextLocale) {
            var locale = _extends({}, contextLocale, _this.props.locale);
            return React.createElement(
                'div',
                { className: _this.props.prefixCls + '-empty-text' },
                locale.emptyText
            );
        };
        return _this;
    }

    _createClass(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                grid: this.props.grid
            };
        }
    }, {
        key: 'isSomethingAfterLastItem',
        value: function isSomethingAfterLastItem() {
            var _props = this.props,
                loadMore = _props.loadMore,
                pagination = _props.pagination,
                footer = _props.footer;

            return !!(loadMore || pagination || footer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var paginationCurrent = this.state.paginationCurrent;
            var _a = this.props,
                bordered = _a.bordered,
                split = _a.split,
                className = _a.className,
                children = _a.children,
                itemLayout = _a.itemLayout,
                loadMore = _a.loadMore,
                pagination = _a.pagination,
                prefixCls = _a.prefixCls,
                grid = _a.grid,
                dataSource = _a.dataSource,
                size = _a.size,
                rowKey = _a.rowKey,
                renderItem = _a.renderItem,
                header = _a.header,
                footer = _a.footer,
                loading = _a.loading,
                locale = _a.locale,
                rest = __rest(_a, ["bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "prefixCls", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer", "loading", "locale"]);
            var loadingProp = loading;
            if (typeof loadingProp === 'boolean') {
                loadingProp = {
                    spinning: loadingProp
                };
            }
            var isLoading = loadingProp && loadingProp.spinning;
            // large => lg
            // small => sm
            var sizeCls = '';
            switch (size) {
                case 'large':
                    sizeCls = 'lg';
                    break;
                case 'small':
                    sizeCls = 'sm';
                default:
                    break;
            }
            var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-vertical', itemLayout === 'vertical'), _defineProperty(_classNames, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_classNames, prefixCls + '-split', split), _defineProperty(_classNames, prefixCls + '-bordered', bordered), _defineProperty(_classNames, prefixCls + '-loading', isLoading), _defineProperty(_classNames, prefixCls + '-grid', grid), _defineProperty(_classNames, prefixCls + '-something-after-last-item', this.isSomethingAfterLastItem()), _classNames));
            var paginationProps = _extends({}, this.defaultPaginationProps, { total: dataSource.length, current: paginationCurrent }, pagination || {});
            var largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
            if (paginationProps.current > largestPage) {
                paginationProps.current = largestPage;
            }
            var paginationContent = pagination ? React.createElement(
                'div',
                { className: prefixCls + '-pagination' },
                React.createElement(Pagination, _extends({}, paginationProps, { onChange: this.defaultPaginationProps.onChange }))
            ) : null;
            var splitDataSource = [].concat(_toConsumableArray(dataSource));
            if (pagination) {
                if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
                    splitDataSource = [].concat(_toConsumableArray(dataSource)).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
                }
            }
            var childrenContent = void 0;
            childrenContent = isLoading && React.createElement('div', { style: { minHeight: 53 } });
            if (splitDataSource.length > 0) {
                var items = splitDataSource.map(function (item, index) {
                    return _this2.renderItem(item, index);
                });
                var childrenList = React.Children.map(items, function (child, index) {
                    return React.cloneElement(child, {
                        key: _this2.keys[index]
                    });
                });
                childrenContent = grid ? React.createElement(
                    Row,
                    { gutter: grid.gutter },
                    childrenList
                ) : childrenList;
            } else if (!children && !isLoading) {
                childrenContent = React.createElement(
                    LocaleReceiver,
                    { componentName: 'Table', defaultLocale: defaultLocale.Table },
                    this.renderEmpty
                );
            }
            var paginationPosition = paginationProps.position || 'bottom';
            return React.createElement(
                'div',
                _extends({ className: classString }, rest),
                (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent,
                header && React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    header
                ),
                React.createElement(
                    Spin,
                    loadingProp,
                    childrenContent,
                    children
                ),
                footer && React.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer
                ),
                loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent
            );
        }
    }]);

    return List;
}(React.Component);

export default List;

List.Item = Item;
List.childContextTypes = {
    grid: PropTypes.any
};
List.defaultProps = {
    dataSource: [],
    prefixCls: 'ant-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false
};