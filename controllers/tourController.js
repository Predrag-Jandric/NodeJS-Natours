const fs = require('fs');

// initial data reading
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  

  
  // route handlers
  exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  };
  
  exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
  
    if (id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  };
  
  exports.createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
  
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  };
  
  exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<updated tour here placeholder>',
      },
    });
  };
  
  exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };