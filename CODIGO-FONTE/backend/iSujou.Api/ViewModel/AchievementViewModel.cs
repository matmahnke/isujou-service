namespace iSujou.Api.ViewModel
{
    public class AchievementViewModel
    {
        public AchievementViewModel(int id, int points)
        {
            Id = id;
            Points = points;
        }

        public int Id { get; set; }
        public int Points { get; set; }
    }
}
