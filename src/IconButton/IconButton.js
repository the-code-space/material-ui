// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import { isMuiElement } from '../utils/reactHelpers';
import '../SvgIcon'; // Ensure CSS specificity

export const styles = theme => ({
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  colorInherit: {
    color: 'inherit',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  icon: {
    width: '1em',
    height: '1em',
  },
});

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  const { buttonRef, children, classes, className, color, disabled, rootRef, ...other } = props;

  return (
    <ButtonBase
      className={classNames(
        classes.root,
        {
          [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
          [classes.disabled]: disabled,
        },
        className,
      )}
      centerRipple
      focusRipple
      disabled={disabled}
      rootRef={buttonRef}
      ref={rootRef}
      {...other}
    >
      <span className={classes.label}>
        {React.Children.map(children, child => {
          if (isMuiElement(child, ['Icon', 'SvgIcon'])) {
            return React.cloneElement(child, {
              className: classNames(classes.icon, child.props.className),
            });
          }
          return child;
        })}
      </span>
    </ButtonBase>
  );
}

IconButton.propTypes = {
  /**
   * Use that property to pass a ref callback to the native button component.
   */
  buttonRef: PropTypes.func,
  /**
   * The icon element.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: PropTypes.func,
};

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false,
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);
