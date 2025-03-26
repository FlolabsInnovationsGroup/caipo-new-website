import SkeletonLoader from '@/components/SkeletonLoader'

export default function FeaturesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Loading */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SkeletonLoader variant="text" className="h-12 mb-6 max-w-2xl mx-auto" />
            <SkeletonLoader variant="text" className="h-6 mb-12 max-w-xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Grid Loading */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[300px]">
                <SkeletonLoader className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Loading */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <SkeletonLoader variant="text" className="h-10 mb-6 max-w-xl mx-auto" />
            <SkeletonLoader variant="text" className="h-6 mb-8 max-w-lg mx-auto" />
            <SkeletonLoader variant="rectangular" className="h-12 w-40 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  )
} 