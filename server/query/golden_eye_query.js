var findLastRemark = "SELECT top 1 [TimeVal], HozOrgan ,Remark FROM [pLogData] LD  with(index(Ind_TimeVHOrganEvent)) where LD.HozOrgan = @id order by [TimeVal] desc"
var findPerson = "select top 1 Owner, OwnerName from [Orion_SKD].[dbo].[pMark] m where OwnerName like @name"
var findPersonInfo = "SELECT p.ID, c.[Name] as Company,p.[Name] as Family, p.FirstName, p.MidName, d.[Name] as Org, pp.[Name] as Title  FROM [Orion_SKD].[dbo].[pMark] m  join [Orion_SKD].[dbo].[pList] p on m.Owner = p.id  left join [Orion_SKD].[dbo].[PCompany] c on p.company = c.[ID]   left join [Orion_SKD].[dbo].[PDivision] d on d.ID = p.Section  left join [Orion_SKD].[dbo].[PPost] pp on pp.ID = p.Post where p.ID = @id"

module.exports = { findPerson, findLastRemark, findPersonInfo };