var findPerson = "SELECT top 2 [TimeVal], HozOrgan ,Remark FROM [pLogData] LD  with(index(Ind_TimeVHOrganEvent)) where LD.HozOrgan = @id order by [TimeVal] desc"

module.exports = { findPerson };