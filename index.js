const Mathmin = Math.min,
	Mathmax = Math.max,
	Mathabs = Math.abs;

const ROUGHLY_EPSILON = 1e-4;

module.exports = {
	// Ranges and Numbers
	clamp: function (min, number, max) {
		return Mathmin(Mathmax(number, min), max);
	},

	between: function (min, number, max) {
		return min <= number && number <= max;
	},

	withinRange: function (target, number, range) {
		$Number.between(target - range, number, target + range);
	},

	betweenModulo: function (start, number, end, period) {
		var numberModulo = (number % period + period) % period;
		var startModulo = (start % period + period) % period;
		var endModulo = (end % period + period) % period;
		if (start <= end) return numberModulo.between(startModulo, end === period ? period : endModulo);
		else return numberModulo > startModulo || numberModulo < endModulo;
	},

	roughlyEqual: function (number, other, epsilon) {
		return Mathabs(this - other) <= (epsilon || ROUGHLY_EPSILON);
	},

	roughlyBetween: function (min, number, max, epsilon) {
		return (min < this || min.isRoughly(this, epsilon))
			&& (this < max || max.isRoughly(this, epsilon));
	}
};