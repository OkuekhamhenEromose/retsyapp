interface ValentinesRelatedSearchesProps {
  searches: string[];
}

const ValentinesRelatedSearches = ({ searches }: ValentinesRelatedSearchesProps) => {
  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
        Related searches
      </h2>
      
      {/* Circular Search Items */}
      <div className="flex justify-center gap-6 mb-10 overflow-x-auto pb-4">
        {searches.map((search, index) => (
          <a
            key={index}
            href={`/search?q=${encodeURIComponent(search)}`}
            className="flex flex-col items-center group shrink-0"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 bg-secondary ring-4 ring-transparent group-hover:ring-gray-200 transition-all">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">{search.split(' ')[0]}</span>
              </div>
            </div>
            <p className="text-sm text-center font-medium text-foreground group-hover:underline max-w-[120px]">
              {search}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ValentinesRelatedSearches;