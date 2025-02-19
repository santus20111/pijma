import React, {FunctionComponent, ReactNode} from 'react'

import {
  css,
  Modal,
  SimpleTransition,
  SimpleTransitionProps,
  Box,
  Pos,
  Card,
  Flex,
  FlexItem,
  FlexPos,
  styled,
  Icon,
} from '@qiwi/pijma-core'

import {Paragraph} from '../typography'

const contentTransitionVertical: FunctionComponent<SimpleTransitionProps> = (props) => <SimpleTransition {...props}/>
const contentTransitionHorizontal: FunctionComponent<SimpleTransitionProps> = (props) => <SimpleTransition {...props}/>

const translate3d = {
  vertical: '0, 100%, 0',
  horizontal: '100%, 0, 0',
}

const defaultProps = (direction: 'vertical' | 'horizontal') => ({
  timeout: {
    enter: 370,
    exit: 250,
  },
  enterClassName: (timeout: number) => css({
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: `opacity ${timeout}ms ease, transform ${timeout}ms ease`,
  }),
  exitClassName: (timeout: number) => css({
    opacity: 0,
    transform: `translate3d(${translate3d[direction]})`,
    transition: `opacity ${timeout}ms ease, transform ${timeout}ms ease`,
  }),
})

contentTransitionVertical.defaultProps = defaultProps('vertical')
contentTransitionHorizontal.defaultProps = defaultProps('horizontal')

const backdropTransition: FunctionComponent<SimpleTransitionProps> = (props) => <SimpleTransition {...props}/>

backdropTransition.defaultProps = {
  timeout: {
    enter: 370,
    exit: 250,
  },
  enterClassName: (timeout: number) => css({
    opacity: 1,
    transition: `opacity ${timeout}ms ease`,
  }),
  exitClassName: (timeout: number) => css({
    opacity: 0,
    transition: `opacity ${timeout}ms ease`,
  }),
}

export interface DropUpProps {
  show: boolean
  onShow?: () => void
  onHide: () => void
  onBack?: () => void
  horizontal?: boolean
  title: string
  footer?: ReactNode
  autoFocus?: boolean
  onKeyDown?: React.KeyboardEventHandler
}

const FlexPosCard = styled(FlexPos)().withComponent(Card)

export const DropUp: FunctionComponent<DropUpProps> = (props) => (
  <Modal
    show={props.show}
    autoFocus={props.autoFocus}
    onShow={props.onShow}
    onHide={props.onHide}
    transition={props.horizontal ? contentTransitionHorizontal : contentTransitionVertical}
    backdropTransition={backdropTransition}
    renderBackdrop={(backdropProps) => (
      <Pos type="fixed" zIndex="auto" top={0} right={0} bottom={0} left={0} {...backdropProps}>
        <Card bg="rgba(245, 245, 245, 0.8)" width={1} height={1}/>
      </Pos>
    )}
    renderDialog={(dialogProps) => (
      <Pos
        type="fixed"
        zIndex={9999}
        top={0}
        bottom={0}
        left={0}
        right={0}
        onKeyDown={props.onKeyDown}
        {...dialogProps}
      >
        <FlexPosCard
          display="flex"
          direction="column"
          width={1}
          maxHeight="calc(100% - 44px)"
          bg="#fff"
          type="absolute"
          bottom={0}
          s="0px 0px 64px 0px rgba(0, 0, 0, 0.16)"
        >
          <Pos zIndex={1}>
            <Card width={1} px={6} py={4} s="0 1px 2px 0 rgba(0, 0, 0, 0.12)">
              <Flex width={1} align="center">
                {props.onBack ? (
                  <Box width={6} height={6} mr={3} onClick={props.onBack}>
                    <Icon name="arrow-left"/>
                  </Box>
                ) : (
                  null
                )}
                <Paragraph size="m" bold>{props.title}</Paragraph>
                <Box width={6} height={6} ml="auto" onClick={props.onHide}>
                  <Icon name="cross"/>
                </Box>
              </Flex>
            </Card>
          </Pos>
          <FlexItem display="flex" grow={1} width={1} minHeight={0}>
            <FlexItem grow={1} minHeight={0} overflow="auto">
              {props.children}
            </FlexItem>
          </FlexItem>
          {props.footer ? (
            <Box p={4} width={1}>
              {props.footer}
            </Box>
          ) : (
            null
          )}
        </FlexPosCard>
      </Pos>
    )}
  />
)
