namespace iSujou.Api.ViewModel
{
    public class AchievementViewModel
    {
        public AchievementViewModel(long id, int points)
        {
            Id = id;
            Points = points;
        }

        public long Id { get; set; }
        public int Points { get; set; }
    }
}
