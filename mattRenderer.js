
// **************************************************************
// Draw monochrome bars
// Draws a row of vertical bars 

/**
 * 
 * @param {UINT8 Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} width 
 * @param {number} height 
 */

function render(frequencyArray, ctx, count, width, height) {
  // Get the number of values in the data array
	const bars = frequencyArray.length
	// Divide the canvas by the number of bars. 
	const step = width / bars
	const lineWidth = (width / count) - 2
	const int = Math.floor(frequencyArray.length / count)


	// Start a new path
	ctx.beginPath()
	// Erase the screen by filling with white. Use a partially 
	// transparent value so the last drawing leaves a trail
	// Define the fillstyle 
	ctx.fillStyle = 'rgba(255, 255, 255, 0.21)'
	ctx.lineWidth = lineWidth
	// Fill the canvas
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

	let fsum = 0

	for (let i = 0; i < bars; i += int) {
		const f = frequencyArray[i]
		fsum = Math.max(fsum, f)

		// FIXME: This doesn't seem to be drawing quite right so far
		
		if (i % int === 0) {
			const fval = fsum
			// Normalize the audio data against the height of the canvas
			// Here we're converting the 0 to 255 values to 0 to 300
			
			// Next draw a line between two points
			const barLength = fval / 255 * height
			// Starting x value
			const x1 = step * i
			// Starting y (bottom of the canvas)
			const y1 = 0
			// Ending x 
			const x2 = x1 
			// Ending y value
			const y2 = barLength

			// Draw the line
			// Move to the starting coordinate
			ctx.moveTo(x1, y1)
			// Draw a line to the end coordinate
			ctx.lineTo(x2, y2)
			fsum = 0

			ctx.strokeStyle = '#74C32E'
			ctx.stroke()
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = 'grey'
			ctx.fillRect(x1 - 6, y2 + 100, 12, 20)
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = 'pink'
			ctx.fillRect(x1 - 1.5, y2 + 90, 3, 10)
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = 'red'
			ctx.fillRect(x1 - 5, y2 + 10, 10, fval)
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = '#74C32E'
			ctx.arc(x1, y2, 10, 0, Math.PI * 2)
			ctx.fill()
			ctx.stroke()
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = 'black'
			ctx.arc(x1 - 2, y2 + 5, 2, 0, Math.PI * 2)
			ctx.fill()
			ctx.closePath()

			ctx.beginPath()
			ctx.arc(x1 + 2, y2 + 5, 2, 0, Math.PI * 2)
			ctx.fill()
			ctx.closePath()
		}
	}
}

export default render