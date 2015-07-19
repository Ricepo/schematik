/**
 * Schematik.Integer
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import { SkNumber } from './number';
import instantiate  from '../util/instantiate';

/**
 * Schematik.Integer
 *
 * @classdesc       Schematik integer type representation.
 */
export class SkInteger extends SkNumber {

  constructor() {
    super();
    this.__type('integer', true);
  }

}

/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkInteger as Schematik.Integer
   */
  Schematik.Integer = SkInteger;

  /*!
   * Attach the Schematik.integer() shorthand.
   */
  Schematik.integer = Schematik.prototype.integer = function() {
    return instantiate(this.self(), Schematik.Integer);
  };

}
