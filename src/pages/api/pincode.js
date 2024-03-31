export default function handler(req, res) {
  let pincodes ={
    "480661" : ["Seoni", "Madhya Pradesh"],
    "462001" : ["Bhopal", "Madhya Pradesh"],
    "110003" : ["Delhi", "Delhi"]
  }
    res.status(200).json(pincodes);
  }