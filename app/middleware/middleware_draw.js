// Import Helpers
const { isArray } = require('../helpers/type_checks');
const draw_detections = require('../helpers/faces_draw.js');

// Export main function
module.exports = async function (req, res, next) {
    try {
        // Check image exists in request 
        // Check matches exist in request 
        // Check return image boolean has been set
        if ((isArray(req.matches) && req.matches.length)
            && ('return_img' in req.query)) {
            draw_detections(
                req.canvas,
                req.matches,
                req.detection_options
            ).then((drawn_canvas) => {
                req.drawn_canvas = drawn_canvas;
                next();
            }).catch((err) => {
                next(err);
            });
        }
        else {
            console.warn("No results found in req.matches to draw");
            next();
        }
    }
    catch (err) {
        next(err);
    }
}