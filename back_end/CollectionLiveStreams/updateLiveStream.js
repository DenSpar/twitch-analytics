// findOneAndUpdate в result вернет:
// 1) если не найдет нужный объект
// {   lastErrorObject: { n: 0, updatedExisting: false },
//     ok: 1,
//     value: null }
// 2) если найдет
// {  lastErrorObject: { n: 1, updatedExisting: true },
//     ok: 1
//     value: {_id: "5fae5bc6684489a78e1bbc8d", ...} } // - новое или старое значение элемента