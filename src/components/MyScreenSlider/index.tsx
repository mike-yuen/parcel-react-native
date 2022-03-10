import * as React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Platform,
  I18nManager,
  FlatListProps,
  NativeScrollEvent,
  LayoutChangeEvent,
  ListRenderItemInfo,
} from 'react-native';
import mergeExtraData from './merge-extradata';

const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android';

type Props<ItemT> = {
  data: ItemT[];
  renderItem: (
    info: ListRenderItemInfo<ItemT> & {
      dimensions: {width: number; height: number};
    },
  ) => React.ReactNode;
  onSlideChange?: (a: number, b: number) => void;
  onDone?: () => void;
} & FlatListProps<ItemT>;

type State = {
  width: number;
  height: number;
  activeIndex: number;
};

export default class MyScreenSlider<ItemT = any> extends React.Component<Props<ItemT>, State> {
  flatList: FlatList<ItemT> | undefined;
  state = {
    width: 0,
    height: 0,
    activeIndex: 0,
  };

  goToSlide = (pageNum: number, triggerOnSlideChange?: boolean) => {
    const prevNum = this.state.activeIndex;
    this.setState({activeIndex: pageNum});
    this.flatList?.scrollToOffset({
      offset: this._rtlSafeIndex(pageNum) * this.state.width,
    });
    if (triggerOnSlideChange && this.props.onSlideChange) {
      this.props.onSlideChange(pageNum, prevNum);
    }
  };

  goToNext = () => {
    this.goToSlide(this.state.activeIndex + 1, true);
  };

  // Get the list ref
  getListRef = () => this.flatList;

  // Index that works across Android's weird rtl bugs
  _rtlSafeIndex = (i: number) => (isAndroidRTL ? this.props.data.length - 1 - i : i);

  // Render a slide
  _renderItem = (flatListArgs: any) => {
    const {width, height} = this.state;
    const props = {...flatListArgs, dimensions: {width, height}, goToNext: this.goToNext};
    // eslint-disable-next-line react-native/no-inline-styles
    return <View style={{width, flex: 1}}>{this.props.renderItem(props)}</View>;
  };

  _onMomentumScrollEnd = (e: {nativeEvent: NativeScrollEvent}) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = this._rtlSafeIndex(Math.round(offset / this.state.width));
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    const lastIndex = this.state.activeIndex;
    this.setState({activeIndex: newIndex});
    this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
  };

  _onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const {width, height} = nativeEvent.layout;
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({width, height});
      // Set new scroll position
      const func = () => {
        this.flatList?.scrollToOffset({
          offset: this._rtlSafeIndex(this.state.activeIndex) * width,
          animated: false,
        });
      };
      setTimeout(func, 0); // Must be called like this to avoid bugs :/
    }
  };

  render() {
    const {renderItem, data, extraData, ...otherProps} = this.props;
    // Merge component width and user-defined extraData
    const extra = mergeExtraData(extraData, this.state.width);

    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={ref => (this.flatList = ref as FlatList<ItemT>)}
          data={this.props.data}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flatList}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={extra}
          onLayout={this._onLayout}
          // make sure all slides are rendered so we can use dots to navigate to them
          initialNumToRender={data.length}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
  },
});
